import { Link } from 'remix';
import { Idea } from '~/types/idea';
import { getPublishedLocaleDate } from '~/utils/common';

interface IdeaPreviewProps {
    idea: Idea;
}

export default function IdeaPreview({ idea }: IdeaPreviewProps) {
    return (
        <div key={idea.id} className="card bg-base-100 shadow-xl image-full">
            <div className="card-body">
                <h2 className="card-title">{idea.title}</h2>
                {idea.published && <p>{getPublishedLocaleDate(idea.published)}</p>}
                <div className="card-actions justify-end">
                    <Link to={`/gallery/${idea.slug}`}>
                        <button type="button" className="btn btn-primary">
                            Read More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
