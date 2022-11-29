import { Link } from 'remix';
import { GalleryItem } from '~/types/gallery';
import { getHeroImage, getPublishedLocaleDate } from '~/utils/common';

interface GalleryPreviewProps {
    item: GalleryItem;
}

export default function GalleryPreview({ item }: GalleryPreviewProps) {
    const hero = getHeroImage(item) || item.heroUrl;

    return (
        <div key={item.id} className="card bg-base-100 shadow-xl image-full">
            {hero && (
                <figure>
                    <img src={hero} alt={item.title} />
                </figure>
            )}
            <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                {item.published && <p>{getPublishedLocaleDate(item.published)}</p>}
                <div className="card-actions justify-end">
                    <Link to={`/gallery/${item.slug}`}>
                        <button type="button" className="btn btn-primary">
                            Visit Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
