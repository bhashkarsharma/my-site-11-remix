import { MetaFunction, useLoaderData } from 'remix';
import CanvasBackground from '~/components/CanvasBackground';
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
        <CanvasBackground sketch={sketch} sketchUrl={ABOUT_BACKGROUND_URL} title="About Me">
            <div className="prose-wrapper">
                <PageTitle>Greetings, earthlings!✌️</PageTitle>
                <p>
                    Hello and welcome to my corner of the internet! I'm a code wizard and world
                    traveler, born in 🇮🇳 and currently residing in 🇩🇪. I speak a little bit of
                    German, but don't be too impressed. 😅
                </p>
                <p>
                    When I'm not busy creating digital magic, you can find me reading, watching, or
                    just generally relaxing in front of a screen. It's a talent, I swear!
                </p>
                <p>
                    With almost 13 years of experience in the tech world, I've had the chance to
                    work for organizations ranging from 2-person startups to market leaders with
                    thousands of employees. I've built web frontends, backends, and native apps
                    across industries like online publishing, IoT, ad-tech, e-commerce, and
                    observability.
                </p>
                <p>
                    So, sit back, relax, and enjoy the ride as you explore my portfolio. From code
                    to art, and everything in between, I promise to keep things interesting and fun.
                    And if you want to join in on the fun, feel free to connect with me on one of
                    the platforms below.
                </p>
            </div>
        </CanvasBackground>
    );
}
