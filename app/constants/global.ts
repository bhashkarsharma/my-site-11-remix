export const SITE = {
    title: 'Bhashkar Sharma',
    cacheHeaders: 'max-age=600, s-maxage=600', // 10 mins caching
    navLinks: [
        {
            to: '/',
            label: 'Home',
        },
        {
            to: '/blog',
            label: 'Blog',
        },
        {
            to: '/lab',
            label: 'Lab',
        },
        {
            to: '/about',
            label: 'About',
        },
        // {
        //     to: '/resume',
        //     label: 'Resume',
        // },
    ],
    postsToFetch: 50,
    postsPerPage: 5,
};

export const TAILWIND_COLORS = [
    'stone',
    'red',
    'orange',
    'lime',
    'green',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'violet',
    'purple',
    'pink',
    'rose',
];
