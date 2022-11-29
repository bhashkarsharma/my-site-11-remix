import { Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import GalleryPreview from '~/components/GalleryPreview';
import PageTitle from '~/components/PageTitle';
import PostPreview from '~/components/PostPreview';
import PostPreviewWrapper from '~/components/PostPreviewWrapper';
import { SITE } from '~/constants/global';
import { GalleryItem } from '~/types/gallery';
import { Post } from '~/types/post';
import { fetchGallery } from '~/utils/gallery';
import { fetchPosts } from '~/utils/post';

export const meta: MetaFunction = () => {
    return {
        title: SITE.title,
        description: 'My homepage',
    };
};

export const loader: LoaderFunction = async () => {
    const posts = await fetchPosts({ itemsToFetch: 4 });
    const gallery = await fetchGallery({ itemsToFetch: 4 });

    return { posts, gallery };
};

export default function Index() {
    const { posts, gallery } = useLoaderData<{
        posts: Post[];
        gallery: GalleryItem[];
    }>();

    return (
        <div className="content-wrapper">
            <PageTitle>Welcome to my website.</PageTitle>

            {posts.length && (
                <>
                    <Link to="/blog">
                        <h2 className="text-xl capitalize font-bold mt-16">Recent posts</h2>
                    </Link>
                    <PostPreviewWrapper>
                        {posts.map((post) => (
                            <PostPreview key={post.id} post={post} />
                        ))}
                    </PostPreviewWrapper>
                </>
            )}

            {gallery.length && (
                <>
                    <Link to="/gallery">
                        <h2 className="text-xl capitalize font-bold mt-16">Gallery</h2>
                    </Link>
                    <PostPreviewWrapper>
                        {gallery.map((item) => (
                            <GalleryPreview key={item.id} item={item} />
                        ))}
                    </PostPreviewWrapper>
                </>
            )}
        </div>
    );
}
