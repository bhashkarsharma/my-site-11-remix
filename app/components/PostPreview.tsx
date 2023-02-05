import PreviewWrapper from './PreviewWrapper';
import { Link, useNavigate } from 'remix';
import { Post } from '~/types/post';
import { getHeroImage, getPublishedLocaleDate } from '~/utils/common';

interface PostPreviewProps {
    post: Post;
}

export default function PostPreview({ post }: PostPreviewProps) {
    const navigate = useNavigate();
    const hero = getHeroImage(post);
    const link = `/blog/${post.slug}`;

    const handleClick = () => navigate(link);

    return (
        <PreviewWrapper key={post.id} onClick={handleClick}>
            {hero && (
                <figure>
                    <img src={hero} alt={post.title} />
                </figure>
            )}
            <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                {post.published && <p>{getPublishedLocaleDate(post.published)}</p>}
                {post.tags?.map((tag) => (
                    <div key={tag} className="badge badge-accent">
                        {tag}
                    </div>
                ))}
                <div className="card-actions justify-end">
                    <Link to={link}>
                        <button type="button" className="btn btn-primary">
                            Read Now
                        </button>
                    </Link>
                </div>
            </div>
        </PreviewWrapper>
    );
}
