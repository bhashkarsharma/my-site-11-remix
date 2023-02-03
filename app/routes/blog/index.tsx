import type { HeadersFunction, LoaderArgs, MetaFunction } from 'remix';
import { Link, useLoaderData } from 'remix';
import PageTitle from '~/components/PageTitle';
import PostPreview from '~/components/PostPreview';
import PostPreviewWrapper from '~/components/PostPreviewWrapper';
import PostTitle from '~/components/PostTitle';
import { SITE } from '~/constants/global';
import { fetchPosts } from '~/utils/post';

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

export const loader = async ({ request }: LoaderArgs) => {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get('p');
    const currentPage = Number(pageParam) || 1;

    const allPosts = await fetchPosts();

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

export default function Blog() {
    const { posts, currentPage, isFirstPage, isLastPage } = useLoaderData<typeof loader>();

    return (
        <div className="content-wrapper">
            <PageTitle>Recent Blog Posts</PageTitle>
            <PostPreviewWrapper>
                {posts.map((post) => (
                    <PostPreview key={post.id} post={post} />
                ))}
            </PostPreviewWrapper>
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
