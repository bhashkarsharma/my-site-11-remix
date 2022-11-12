/* eslint-disable global-require */
module.exports = {
    content: ['./app/**/*.{ts,tsx,jsx,js}'],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [require('daisyui'), require('@tailwindcss/typography')],
    daisyui: {
        themes: ['emerald', 'dark', 'night'],
        darkTheme: 'night',
    },
};
