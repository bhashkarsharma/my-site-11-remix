import type { MetaFunction } from 'remix';
import PageTitle from '~/components/PageTitle';
import { SITE } from '~/constants/global';

export const meta: MetaFunction = () => {
    return {
        title: `About - ${SITE.title}`,
        description: 'About me',
    };
};

export default function About() {
    return (
        <div className="main-wrapper">
            <PageTitle>Hi there! 👋</PageTitle>
            <p>Nice to meet you. I am Bhashkar.</p>
            <p>🚧 I am currently building my site. Please visit again. 🚧</p>
        </div>
    );
}
