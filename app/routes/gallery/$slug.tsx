/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react';
import { Link, useLoaderData } from 'remix';
import type { HeadersFunction, LoaderArgs, MetaFunction } from 'remix';
import invariant from 'tiny-invariant';
import PageTitle from '~/components/PageTitle';
import { SITE } from '~/constants/global';
import useTimeout from '~/hooks/useTimeout';
import { getHeroImage, getPublishedLocaleDate } from '~/utils/common';
import { fetchGalleryItem } from '~/utils/gallery';

const EXTERNAL_BUTTON_SHOW_DELAY = 4000; // ms

export const headers: HeadersFunction = () => {
    return {
        'Cache-Control': SITE.cacheHeaders,
    };
};

export const meta: MetaFunction = ({ data }) => {
    return {
        title: `${data?.item?.title} - ${SITE.title}`,
        description: data?.item?.byline ?? 'My gallery',
    };
};

export const loader = async ({ params: { slug } }: LoaderArgs) => {
    invariant(slug, 'expected params.slug');

    const item = await fetchGalleryItem(slug);

    if (!item) {
        throw new Response('Not Found', { status: 404 });
    }

    return { item };
};

export default function GalleryItemView() {
    const { item } = useLoaderData<typeof loader>();
    const hero = getHeroImage(item);
    const [showExternalButton, setShowExternalButton] = useState(false);

    useTimeout(() => {
        setShowExternalButton(true);
    }, EXTERNAL_BUTTON_SHOW_DELAY);

    return (
        <>
            <div
                className={`hero${hero ? ' min-h-screen' : ''}`}
                style={{
                    ...(hero && { backgroundImage: `url("${hero}")` }),
                }}
            >
                <div className="bg-opacity/60 hero-overlay" />
                <div className="hero-content text-neutral-content">
                    <div>
                        <PageTitle>{item.title}</PageTitle>
                        {item.byline && <h2>{item.byline}</h2>}
                        <div className="post-date">{getPublishedLocaleDate(item.published)}</div>
                    </div>
                </div>
            </div>

            {item.contentUrl ? (
                <div className="gallery demo-wrapper text-center">
                    {showExternalButton && !item.content && (
                        <a
                            className="btn btn-warning m-6"
                            target="_blank"
                            rel="noreferrer"
                            href={item.contentUrl}
                        >
                            Content not loading? Visit external website
                        </a>
                    )}
                    <iframe src={item.contentUrl} srcDoc={item.content} title={item.title} />
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
