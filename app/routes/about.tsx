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
        <div className="prose-wrapper">
            <PageTitle>Hi there! 👋</PageTitle>
            <p>Nice to meet you. I am Bhashkar.</p>
            <p>I am from 🇮🇳, currently living in 🇩🇪. Ich kann ein bisschen Deutsch sprechen.</p>
            <p>
                I spend way too much time in front of screens, either focusing on writing code or
                text; or relaxing by reading or watching anything that catches my fancy.
            </p>
            <p>
                I have been professionally writing code for almost 13 years, for a variety of
                organizations, ranging from a 2-person startup running out of a living room, all the
                way up to companies which are market leaders in their field, with thousands of
                employees. I have worked across industries such as online publishing, IoT, ad-tech,
                e-commerce, observability etc. I have built web frontends, backends, and native
                apps. Lately I have been focusing mostly on web frontends.
            </p>
            <p>Feel free to reach out / follow me at one of the platforms below.</p>
        </div>
    );
}
