import { MetaFunction, useLoaderData } from 'remix';
import PageTitle from '~/components/PageTitle';
import { SITE } from '~/constants/global';
import { getSrcDocFromP5Sketch } from '~/utils/gallery';

const ABOUT_BACKGROUND_URL = 'https://editor.p5js.org/bhashkarsharma/full/WuIgq5brn';

export const meta: MetaFunction = () => {
    return {
        title: `About - ${SITE.title}`,
        description: 'About me',
    };
};

export const loader = async () => {
    const sketch = await getSrcDocFromP5Sketch(ABOUT_BACKGROUND_URL);

    return { sketch };
};

export default function About() {
    const { sketch } = useLoaderData<typeof loader>();
    return (
        <div className="relative">
            {sketch && (
                <iframe
                    className="absolute z-[-1] w-full min-h-screen"
                    src={ABOUT_BACKGROUND_URL}
                    srcDoc={sketch}
                    title="About Me"
                />
            )}

            <div className="prose-wrapper">
                <PageTitle>Hi there! 👋</PageTitle>
                <p>Nice to meet you. I am Bhashkar.</p>
                <p>I am from 🇮🇳, currently living in 🇩🇪. Ich kann ein bisschen Deutsch sprechen.</p>
                <p>
                    I spend way too much time in front of screens, either focusing on writing code
                    or text; or relaxing by reading or watching anything that catches my fancy.
                </p>
                <p>
                    I have been professionally writing code for almost 13 years, for a variety of
                    organizations, ranging from a 2-person startup running out of a living room, all
                    the way up to companies which are market leaders in their field, with thousands
                    of employees. I have worked across industries like online publishing, IoT,
                    ad-tech, e-commerce, observability; and have built web frontends, backends, and
                    native apps.
                </p>
                <p>Feel free to reach out / follow me at one of the platforms below.</p>
            </div>
        </div>
    );
}
