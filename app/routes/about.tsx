import type { MetaFunction } from 'remix';
import PageTitle from '~/components/PageTitle';

export let meta: MetaFunction = () => {
    return {
        title: 'About - Bhashkar Sharma',
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
