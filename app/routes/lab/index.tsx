import type { MetaFunction } from 'remix';
import PageTitle from '~/components/PageTitle';
import { SITE } from '~/constants/global';

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
        </div>
    );
}
