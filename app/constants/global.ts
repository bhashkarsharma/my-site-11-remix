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
            to: '/gallery',
            label: 'Gallery',
        },
        // {
        //     to: '/lab',
        //     label: 'Lab',
        // },
        {
            to: '/about',
            label: 'About',
        },
        // {
        //     to: '/resume',
        //     label: 'Resume',
        // },
    ],
    postsToFetch: 60,
    postsPerPage: 12,
    imagesToFetch: 50,
    imagesPerPage: 12,
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
