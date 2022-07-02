import { Link, MetaFunction } from 'remix';
import PageTitle from '~/components/PageTitle';
import PostTitle from '~/components/PostTitle';
import { SITE } from '~/constants/global';

const LAB_LINKS = [{ label: 'Snake', to: '/lab/snake' }];

export const meta: MetaFunction = () => {
    return {
        title: `Lab - ${SITE.title}`,
        description: 'My experiments, kinda',
    };
};

export default function Lab() {
    return (
        <div className="content-wrapper">
            <PageTitle>Lab</PageTitle>
            <ul>
                {LAB_LINKS.map((item) => (
                    <li key={item.label} className="my-8">
                        <Link to={item.to}>
                            <PostTitle>{item.label}</PostTitle>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
