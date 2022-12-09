import type { HeadersFunction, LoaderFunction, MetaFunction } from 'remix';
import { Link, useLoaderData } from 'remix';
import GalleryPreview from '~/components/GalleryPreview';
import PageTitle from '~/components/PageTitle';
import PostPreviewWrapper from '~/components/PostPreviewWrapper';
import PostTitle from '~/components/PostTitle';
import { SITE } from '~/constants/global';
import { GalleryItem } from '~/types/gallery';
import { fetchGallery } from '~/utils/gallery';

export const headers: HeadersFunction = () => {
    return {
        'Cache-Control': SITE.cacheHeaders,
    };
};

export const meta: MetaFunction = () => {
    return {
        title: `Gallery - ${SITE.title}`,
        description: 'My writings',
    };
};

type LoaderData = {
    posts: Awaited<Promise<GalleryItem[]>>;
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get('p');
    const currentPage = Number(pageParam) || 1;

    const allPosts = await fetchGallery();

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

export default function Gallery() {
    const { posts, currentPage, isFirstPage, isLastPage } = useLoaderData() as LoaderData;

    return (
        <div className="content-wrapper">
            <PageTitle>Recent Gallery</PageTitle>
            <PostPreviewWrapper>
                {posts.map((post) => (
                    <GalleryPreview key={post.id} item={post} />
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
