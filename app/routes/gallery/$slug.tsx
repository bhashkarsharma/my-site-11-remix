/* eslint-disable tailwindcss/no-custom-classname */
import { Link, useLoaderData } from 'remix';
import type { HeadersFunction, LoaderFunction, MetaFunction } from 'remix';
import invariant from 'tiny-invariant';
import PageTitle from '~/components/PageTitle';
import { SITE, TAILWIND_COLORS } from '~/constants/global';
import { GalleryItem } from '~/types/gallery';
import { getHeroImage, getPublishedLocaleDate } from '~/utils/common';
import { fetchGalleryItem } from '~/utils/gallery';

const getRandomColor = () => TAILWIND_COLORS[Math.floor(Math.random() * TAILWIND_COLORS.length)];

export const headers: HeadersFunction = () => {
    return {
        'Cache-Control': SITE.cacheHeaders,
    };
};

export const meta: MetaFunction = ({ data }) => {
    return {
        title: `${data?.post?.title} - ${SITE.title}`,
        description: data?.post?.byline ?? 'My gallery',
    };
};

export const loader: LoaderFunction = async ({ params: { slug } }) => {
    invariant(slug, 'expected params.slug');

    const item = await fetchGalleryItem(slug);

    if (!item) {
        throw new Response('Not Found', { status: 404 });
    }

    const bgColor = getRandomColor();

    return { item, bgColor };
};

export default function GalleryItemView() {
    const { item, bgColor } = useLoaderData<{ item: GalleryItem; bgColor: string }>();
    const hero = getHeroImage(item);

    return (
        <>
            <div
                className={`hero${hero ? ' min-h-screen' : ''}`}
                style={{
                    ...(hero && { backgroundImage: `url("${hero}")` }),
                }}
            >
                <div className={`bg-opacity/60 hero-overlay ${!hero && `bg-${bgColor}/600`}`} />
                <div className="hero-content text-neutral-content">
                    <div>
                        <PageTitle>{item.title}</PageTitle>
                        {item.byline && <h2>{item.byline}</h2>}
                        <div className="post-date">{getPublishedLocaleDate(item.published)}</div>
                    </div>
                </div>
            </div>

            {item.contentUrl ? (
                <div className="gallery prose-wrapper text-center">
                    <iframe src={item.contentUrl} title={item.title} />

                    <a target="_blank" rel="noreferrer" href={item.contentUrl}>
                        Visit external website
                    </a>
                </div>
            ) : (
                <div
                    className="gallery prose-wrapper"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: item.content || '' }}
                />
            )}

            <div className="p-8 text-center text-4xl font-bold">
                <Link to="/gallery">Back to Gallery</Link>
            </div>
        </>
    );
}
