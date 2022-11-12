import { Link } from 'remix';
import { Post } from '~/types/post';
import { getHeroImage, getPublishedLocaleDate } from '~/utils/post';

interface PostPreviewProps {
    post: Post;
}

export default function PostPreview({ post }: PostPreviewProps) {
    const hero = getHeroImage(post);

    return (
        <div key={post.id} className="card bg-base-100 shadow-xl image-full">
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
                    <Link to={`/blog/${post.slug}`}>
                        <button type="button" className="btn btn-primary">
                            Read Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
