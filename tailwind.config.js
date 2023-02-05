/* eslint-disable global-require */
module.exports = {
    content: ['./app/**/*.{ts,tsx,jsx,js}'],
    plugins: [require('daisyui'), require('@tailwindcss/typography')],
    daisyui: {
        themes: [
            {
                bee: {
                    primary: '#f59e0b',
                    secondary: '#f3f4f6',
                    accent: '#d97706',
                    neutral: '#111827',
                    'base-100': '#facc15',
                    info: '#06b6d4',
                    success: '#65a30d',
                    warning: '#f97316',
                    error: '#dc2626',
                },
                darkbee: {
                    primary: '#eab308',
                    secondary: '#ca8a04',
                    accent: '#fef9c3',
                    neutral: '#fde047',
                    'base-100': '#111827',
                    info: '#3ABFF8',
                    success: '#36D399',
                    warning: '#FBBD23',
                    error: '#F87272',
                },
            },
        ],
        darkTheme: 'darkbee',
    },
};
