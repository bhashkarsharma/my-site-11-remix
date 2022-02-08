import { useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import invariant from "tiny-invariant";
import { getPost, getPublishedLocaleDate } from "~/utils/post";
import type { Post } from "~/types/post";
import PageTitle from "~/components/PageTitle";
import { tw } from "brise";

export let meta: MetaFunction = ({ data }: { data: Post }) => {
  return {
    title: `${data.title} - Bhashkar Sharma`,
    description: data.byline ?? "My writings",
  };
};

export const loader: LoaderFunction = async ({ params: { slug } }) => {
  invariant(slug, "expected params.slug");

  const post = await getPost(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return post;
};

const getHeroImage = (post: Post) => post.hero?.[0].thumbnails.large.url;

const Heading = tw.div`
  p-4
`;

const Published = tw.div`
  italic
`;

export default function Post() {
  const post = useLoaderData<Post>();
  const hero = getHeroImage(post);

  return (
    <div className="main-wrapper">
      <Heading>
        <PageTitle>{post.title}</PageTitle>
        {post.byline && <h2>{post.byline}</h2>}
        <Published>{getPublishedLocaleDate(post.published)}</Published>
      </Heading>
      {hero && (
        <img
          className="h-full w-full object-cover"
          src={hero}
          alt="Hero Image"
        />
      )}
      <div
        className="w-auto text-xl first-letter:text-7xl"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </div>
  );
}
