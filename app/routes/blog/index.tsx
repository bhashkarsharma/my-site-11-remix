import type { MetaFunction } from "remix";
import { Link, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getPosts, getPublishedLocaleDate } from "~/utils/post";
import type { Post } from "~/types/post";
import PageTitle from "~/components/PageTitle";

export let meta: MetaFunction = () => {
  return {
    title: "Blog - Bhashkar Sharma",
    description: "My writings",
  };
};

export const loader: LoaderFunction = () => getPosts();

export default function Blog() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="main-wrapper">
      <PageTitle>Recent Posts</PageTitle>
      <ul>
        {posts.map((post) => (
          <li className="my-4" key={post.id}>
            <Link to={`/blog/${post.slug}`}>
              <h2 className="mb-6 text-3xl lg:text-5xl capitalize font-bold">
                {post.title}
              </h2>
              <div>{getPublishedLocaleDate(post.published)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
