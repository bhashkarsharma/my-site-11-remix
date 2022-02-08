import { useLoaderData } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';
import invariant from 'tiny-invariant';
import PageTitle from '~/components/PageTitle';
import type { Post } from '~/types/post';
import { getPost, getPublishedLocaleDate } from '~/utils/post';

export let meta: MetaFunction = ({ data }: { data: Post }) => {
    return {
        title: `${data.title} - Bhashkar Sharma`,
        description: data.byline ?? 'My writings',
    };
};

export const loader: LoaderFunction = async ({ params: { slug } }) => {
    invariant(slug, 'expected params.slug');

    const post = await getPost(slug);

    if (!post) {
        throw new Response('Not Found', { status: 404 });
    }

    return post;
};

const getHeroImage = (post: Post) => post.hero?.[0].thumbnails.large.url;

export default function BlogPost() {
    const post = useLoaderData<Post>();
    const hero = getHeroImage(post);

    return (
        <div className="main-wrapper">
            <div className="p-4">
                <PageTitle>{post.title}</PageTitle>
                {post.byline && <h2>{post.byline}</h2>}
                <div className="post-date">
                    {getPublishedLocaleDate(post.published)}
                </div>
            </div>
            {hero && (
                <img
                    className="h-full w-full object-cover"
                    src={hero}
                    alt="Hero Image"
                />
            )}
            <div
                className="w-auto text-xl first-letter:text-7xl"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
        </div>
    );
}
