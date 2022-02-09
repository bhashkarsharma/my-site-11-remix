import type { MetaFunction } from 'remix';
import PageTitle from '~/components/PageTitle';
import { SITE } from '~/constants/global';

export const meta: MetaFunction = () => {
    return {
        title: SITE.title,
        description: 'My homepage',
    };
};

export default function Index() {
    return (
        <div className="main-wrapper">
            <PageTitle>Welcome to my website!</PageTitle>
            <p>Glad to have you here 🥳</p>
        </div>
    );
}
