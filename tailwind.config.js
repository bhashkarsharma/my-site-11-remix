module.exports = {
    content: ['./app/**/*.{ts,tsx,jsx,js}'],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'dark'],
    },
};
