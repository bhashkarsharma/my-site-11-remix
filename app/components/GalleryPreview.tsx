import PreviewWrapper from './PreviewWrapper';
import { Link, useNavigate } from 'remix';
import { GalleryItem } from '~/types/gallery';
import { getHeroImage, getPublishedLocaleDate } from '~/utils/common';

interface GalleryPreviewProps {
    item: GalleryItem;
}

export default function GalleryPreview({ item }: GalleryPreviewProps) {
    const navigate = useNavigate();
    const link = `/gallery/${item.slug}`;

    const handleClick = () => navigate(link);

    const hero = getHeroImage(item) || item.heroUrl;

    return (
        <PreviewWrapper key={item.id} onClick={handleClick}>
            {hero && (
                <figure>
                    <img src={hero} alt={item.title} />
                </figure>
            )}
            <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                {item.published && <p>{getPublishedLocaleDate(item.published)}</p>}
                <div className="card-actions justify-end">
                    <Link to={link}>
                        <button type="button" className="btn btn-primary">
                            Visit Now
                        </button>
                    </Link>
                </div>
            </div>
        </PreviewWrapper>
    );
}
