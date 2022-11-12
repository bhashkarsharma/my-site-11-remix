import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import PageTitle from '~/components/PageTitle';
import PostPreview from '~/components/PostPreview';
import PostPreviewWrapper from '~/components/PostPreviewWrapper';
import { SITE } from '~/constants/global';
import { Post } from '~/types/post';
import { getPosts } from '~/utils/post';

export const meta: MetaFunction = () => {
    return {
        title: SITE.title,
        description: 'My homepage',
    };
};

export const loader: LoaderFunction = async () => {
    const latestPosts = await getPosts({ postsToFetch: 3 });
    latestPosts.push({
        id: 'blog',
        title: 'All Posts',
        contentType: 'post',
        slug: '',
    });
    return { posts: latestPosts };
};

export default function Index() {
    const { posts } = useLoaderData<{
        posts: Post[];
    }>();

    return (
        <div className="content-wrapper">
            <PageTitle>Welcome to my website.</PageTitle>

            <div className="text-xl capitalize font-bold mt-16">Recent posts</div>
            <PostPreviewWrapper>
                {posts.map((post) => (
                    <PostPreview key={post.id} post={post} />
                ))}
            </PostPreviewWrapper>
        </div>
    );
}
