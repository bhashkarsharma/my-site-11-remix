import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from 'remix';
import type { LinksFunction } from 'remix';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';
import PageTitle from '~/components/PageTitle';
import SideDrawer from '~/components/SideDrawer';
import { SITE } from '~/constants/global';
import stylesUrl from '~/tailwind.css';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: stylesUrl }];
};

export default function App() {
    return (
        <Document>
            <Layout>
                <Outlet />
            </Layout>
        </Document>
    );
}

export function ErrorBoundary() {
    return (
        <Document title="Error!">
            <Layout>
                <div className="content-wrapper">
                    <PageTitle>There was an error!</PageTitle>

                    <p>
                        Whoops! Looks like our server just tripped and fell. We're working on
                        getting it back up and running. Please refresh the page, or
                        <Link to="/">go back Home</Link>.
                    </p>
                </div>
            </Layout>
        </Document>
    );
}

export function CatchBoundary() {
    let caught = useCatch();

    let message;
    switch (caught.status) {
        case 401:
            message = (
                <p>
                    Looks like you need to be on the list to access this page. Maybe try getting a
                    VIP pass next time?
                </p>
            );
            break;
        case 404:
            message = (
                <p>
                    Oops! Looks like you took a wrong turn somewhere. But don't worry, the only
                    thing missing is the page you were looking for.
                </p>
            );
            break;

        default:
            throw new Error(caught.data || caught.statusText);
    }

    return (
        <Document title={`${caught.status}`}>
            <Layout>
                <div className="content-wrapper">
                    <PageTitle>
                        {caught.status}: {caught.statusText}
                    </PageTitle>
                    {message}
                </div>
            </Layout>
        </Document>
    );
}

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                {title ? <title>{title}</title> : null}
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === 'development' && <LiveReload />}
            </body>
        </html>
    );
}

Document.defaultProps = {
    title: SITE.title,
};

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen">
            <div className="h-full shadow bg-base-200 drawer drawer-end">
                <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
                <div className="h-full flex flex-col justify-between drawer-content">
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </div>
                <SideDrawer />
            </div>
        </div>
    );
}
