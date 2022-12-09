import { Link, useLoaderData } from 'remix';
import type { HeadersFunction, LoaderFunction, MetaFunction } from 'remix';
import invariant from 'tiny-invariant';
import PageTitle from '~/components/PageTitle';
import { SITE, TAILWIND_COLORS } from '~/constants/global';
import type { Post } from '~/types/post';
import { getHeroImage, getPublishedLocaleDate } from '~/utils/common';
import { fetchPost } from '~/utils/post';

const getRandomColor = () => TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)];

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

type LoaderData = {
    post: Awaited<Promise<Post>>;
    bgColor: string;
};

export const loader: LoaderFunction = async ({ params: { slug } }) => {
    invariant(slug, 'expected params.slug');

    const post = await fetchPost(slug);

    if (!post) {
        throw new Response('Not Found', { status: 404 });
    }

    const bgColor = getRandomColor();

    return { post, bgColor };
};

export default function BlogPost() {
    const { post, bgColor } = useLoaderData() as LoaderData;
    const hero = getHeroImage(post);

    return (
        <>
            <div
                className={`hero${hero ? ' min-h-screen' : ''}`}
                style={{
                    ...(hero && { backgroundImage: `url("${hero}")` }),
                }}
            >
                {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                <div className={`bg-opacity/60 hero-overlay ${!hero && `bg-${bgColor}-600`}`} />
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
