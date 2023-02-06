import { Link, useLoaderData } from 'remix';
import type { HeadersFunction, LoaderArgs, MetaFunction } from 'remix';
import invariant from 'tiny-invariant';
import PageTitle from '~/components/PageTitle';
import { SITE } from '~/constants/global';
import { getHeroImage, getPublishedLocaleDate } from '~/utils/common';
import { fetchPost } from '~/utils/post';

export const headers: HeadersFunction = () => {
    return {
        'Cache-Control': SITE.cacheHeaders,
    };
};

export const meta: MetaFunction = ({ data }) => {
    return {
        title: `${data?.post?.title} - ${SITE.title}`,
        description: data?.post?.byline ?? 'My writings',
    };
};

export const loader = async ({ params: { slug } }: LoaderArgs) => {
    invariant(slug, 'expected params.slug');

    const post = await fetchPost(slug);

    if (!post) {
        throw new Response('Not Found', { status: 404 });
    }

    return { post };
};

export default function BlogPost() {
    const { post } = useLoaderData<typeof loader>();
    const hero = getHeroImage(post);

    return (
        <>
            <div
                className={`hero${hero ? ' min-h-screen' : ''}`}
                style={{
                    ...(hero && { backgroundImage: `url("${hero}")` }),
                }}
            >
                {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
                <div className="bg-opacity-80 hero-overlay" />
                <div className="hero-content text-neutral-content">
                    <div>
                        <PageTitle>{post.title}</PageTitle>
                        {post.byline && <h2>{post.byline}</h2>}
                        <div className="post-date">{getPublishedLocaleDate(post.published)}</div>
                    </div>
                </div>
            </div>

            <div
                className="prose-wrapper"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            <div className="p-8 text-center text-4xl font-bold">
                <Link to="/blog">Back to Blog</Link>
            </div>
        </>
    );
}
