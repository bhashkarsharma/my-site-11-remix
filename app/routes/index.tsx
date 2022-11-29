import { Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import GalleryPreview from '~/components/GalleryPreview';
import IdeaPreview from '~/components/IdeaPreview';
import PageTitle from '~/components/PageTitle';
import PostPreview from '~/components/PostPreview';
import PostPreviewWrapper from '~/components/PostPreviewWrapper';
import { SITE } from '~/constants/global';
import { GalleryItem } from '~/types/gallery';
import { Idea } from '~/types/idea';
import { Post } from '~/types/post';
import { fetchGallery } from '~/utils/gallery';
import { fetchIdeas } from '~/utils/idea';
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
    const ideas = await fetchIdeas({ itemsToFetch: 4 });

    return { posts, gallery, ideas };
};

export default function Index() {
    const { posts, gallery, ideas } = useLoaderData<{
        posts: Post[];
        gallery: GalleryItem[];
        ideas: Idea[];
    }>();

    return (
        <div className="content-wrapper">
            <PageTitle>Welcome to my website.</PageTitle>

            {posts.length > 0 && (
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

            {gallery.length > 0 && (
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

            {ideas.length > 0 && (
                <>
                    <Link to="/ideas">
                        <h2 className="text-xl capitalize font-bold mt-16">Ideas</h2>
                    </Link>
                    <PostPreviewWrapper>
                        {ideas.map((idea) => (
                            <IdeaPreview key={idea.id} idea={idea} />
                        ))}
                    </PostPreviewWrapper>
                </>
            )}
        </div>
    );
}
