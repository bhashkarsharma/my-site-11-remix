import { Link, MetaFunction, useLoaderData } from 'remix';
import CanvasBackground from '~/components/CanvasBackground';
import GalleryPreview from '~/components/GalleryPreview';
import IdeaPreview from '~/components/IdeaPreview';
import PageTitle from '~/components/PageTitle';
import PostPreview from '~/components/PostPreview';
import PostPreviewWrapper from '~/components/PostPreviewWrapper';
import { SITE } from '~/constants/global';
import { fetchGallery, getSrcDocFromP5Sketch } from '~/utils/gallery';
import { fetchIdeas } from '~/utils/idea';
import { fetchPosts } from '~/utils/post';

const HOME_BACKGROUND_URL = 'https://editor.p5js.org/bhashkarsharma/full/R2n1QXNW8';

export const meta: MetaFunction = () => {
    return {
        title: SITE.title,
        description: 'My homepage',
    };
};

export const loader = async () => {
    const [posts, gallery, ideas, sketch] = await Promise.all([
        fetchPosts({ itemsToFetch: 4 }),
        fetchGallery({ itemsToFetch: 4 }),
        fetchIdeas({ itemsToFetch: 4 }),
        getSrcDocFromP5Sketch(HOME_BACKGROUND_URL),
    ]);

    return { posts, gallery, ideas, sketch };
};

export default function Index() {
    const { posts, gallery, ideas, sketch } = useLoaderData<typeof loader>();

    return (
        <CanvasBackground sketch={sketch} sketchUrl={HOME_BACKGROUND_URL} title="Home">
            <div className="w-full min-h-screen" />
            <div className="content-wrapper">
                <PageTitle>A World of Words, Code, and Art</PageTitle>
                <p>Discovering My Digital Expressions.</p>

                {gallery.length > 0 && (
                    <>
                        <Link to="/gallery">
                            <h2 className="text-2xl capitalize font-bold mt-16">Gallery</h2>
                        </Link>
                        <PostPreviewWrapper>
                            {gallery.map((item) => (
                                <GalleryPreview key={item.id} item={item} />
                            ))}
                        </PostPreviewWrapper>
                    </>
                )}

                {posts.length > 0 && (
                    <>
                        <Link to="/blog">
                            <h2 className="text-2xl capitalize font-bold mt-16">Posts</h2>
                        </Link>
                        <PostPreviewWrapper>
                            {posts.map((post) => (
                                <PostPreview key={post.id} post={post} />
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
        </CanvasBackground>
    );
}
