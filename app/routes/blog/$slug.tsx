import { Link, useLoaderData } from 'remix';
import type { HeadersFunction, LoaderFunction, MetaFunction } from 'remix';
import invariant from 'tiny-invariant';
import PageTitle from '~/components/PageTitle';
import { SITE, TAILWIND_COLORS } from '~/constants/global';
import type { Post } from '~/types/post';
import { getPost, getPublishedLocaleDate } from '~/utils/post';

export const headers: HeadersFunction = () => {
    return {
        'Cache-Control': SITE.cacheHeaders,
    };
};

export const meta: MetaFunction = ({ data }: { data: Post }) => {
    return {
        title: `${data.title} - ${SITE.title}`,
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

const getRandomColor = () =>
    TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)];

const getHeroImage = (post: Post) => post.hero?.[0].thumbnails.large.url;

const PostHeading = ({ post }: { post: Post }) => {
    return (
        <div className="content-wrapper pb-2">
            <PageTitle>{post.title}</PageTitle>
            {post.byline && <h2>{post.byline}</h2>}
            <div className="post-date">
                {getPublishedLocaleDate(post.published)}
            </div>
        </div>
    );
};

export default function BlogPost() {
    const post = useLoaderData<Post>();
    const hero = getHeroImage(post);

    return (
        <>
            <div
                className={`hero min-h-screen ${
                    hero ? '' : `bg-${getRandomColor()}-600`
                }`}
                style={{
                    ...(hero && { backgroundImage: `url("${hero}")` }),
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content">
                    <div>
                        <PageTitle>{post.title}</PageTitle>
                        {post.byline && <h2>{post.byline}</h2>}
                        <div className="post-date">
                            {getPublishedLocaleDate(post.published)}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="content-wrapper text-xl first-letter:text-7xl"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
            ></div>

            <div className="content-wrapper text-center text-4xl font-bold">
                <Link to="/blog">Back to Blog</Link>
            </div>
        </>
    );
}
