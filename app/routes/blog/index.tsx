import { tw } from 'brise';
import type { HeadersFunction, LoaderFunction, MetaFunction } from 'remix';
import { Link, useLoaderData } from 'remix';
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

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get('p');
    const currentPage = Number(pageParam) || 1;

    const allPosts = await getPosts();

    const startIndex = Math.min(
        Math.max(0, allPosts.length),
        (currentPage - 1) * SITE.postsPerPage,
    );
    const endIndex = Math.min(Math.max(0, allPosts.length), startIndex + SITE.postsPerPage);

    const posts = allPosts.slice(startIndex, endIndex);

    const isFirstPage = currentPage === 1;
    const isLastPage = allPosts.length - endIndex < SITE.postsPerPage;

    return { posts, currentPage, isFirstPage, isLastPage };
};

const PostTitle = tw.h2<{ color?: string }>`
  mb-2
  text-3xl
  lg:text-5xl
  capitalize
  font-bold
  ${(props) => (props.color ? `text-${props.color}-400` : '')}
`;

export default function Blog() {
    const { posts, currentPage, isFirstPage, isLastPage } = useLoaderData<{
        posts: Post[];
        currentPage: number;
        isFirstPage: boolean;
        isLastPage: boolean;
    }>();

    return (
        <div className="content-wrapper">
            <PageTitle>Recent Blog Posts</PageTitle>
            <ul>
                {posts.map((post, index) => (
                    <li className="my-8" key={post.id}>
                        <Link to={`/blog/${post.slug}`}>
                            <PostTitle color={TAILWIND_COLORS[index]}>{post.title}</PostTitle>
                            <div className="post-date">
                                {getPublishedLocaleDate(post.published)}
                                {post.tags?.map((tag) => (
                                    <div key={tag} className="ml-4 badge badge-accent">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            {posts.length > 0 ? (
                <div className="btn-group grid grid-cols-2">
                    <Link
                        className={`btn ${isFirstPage && 'btn-disabled'}`}
                        to={`?p=${currentPage - 1}`}
                    >
                        Newer Posts
                    </Link>
                    <Link
                        className={`btn ${isLastPage && 'btn-disabled'}`}
                        to={`?p=${currentPage + 1}`}
                    >
                        Older Posts
                    </Link>
                </div>
            ) : (
                <PostTitle>Could not fetch posts. Please come back later.</PostTitle>
            )}
        </div>
    );
}
