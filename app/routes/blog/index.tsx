import { tw } from 'brise';
import type { HeadersFunction, MetaFunction } from 'remix';
import { Link, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import PageTitle from '~/components/PageTitle';
import { SITE, TAILWIND_COLORS } from '~/constants/global';
import type { Post } from '~/types/post';
import { getPosts, getPublishedLocaleDate } from '~/utils/post';

export const headers: HeadersFunction = () => {
    return {
        'Cache-Control': SITE.cacheHeaders,
    };
};

export const meta: MetaFunction = () => {
    return {
        title: `Blog - ${SITE.title}`,
        description: 'My writings',
    };
};

export const loader: LoaderFunction = () => getPosts();

const PostTitle = tw.h2<{ color: string }>`
  mb-2
  text-3xl
  lg:text-5xl
  capitalize
  font-bold
  ${(props) => (props.color ? `text-${props.color}-400` : '')}
`;

export default function Blog() {
    const posts = useLoaderData<Post[]>();

    return (
        <div className="main-wrapper">
            <PageTitle>Recent Blog Posts</PageTitle>
            <ul>
                {posts.map((post, index) => (
                    <li className="my-8" key={post.id}>
                        <Link to={`/blog/${post.slug}`}>
                            <PostTitle color={TAILWIND_COLORS[index]}>
                                {post.title}
                            </PostTitle>
                            <div className="post-date">
                                {getPublishedLocaleDate(post.published)}
                                {post.tags?.map((tag) => (
                                    <div
                                        key={tag}
                                        className="ml-4 badge badge-accent"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
