module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'simple-import-sort', 'react', 'prettier'],
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
    ],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'import/extensions': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/no-array-index-key': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton'],
            },
        ],
        'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
        'react/no-unescaped-entities': 'off',
        'import/no-cycle': [0, { ignoreExternal: true }],
        'prefer-const': 'off',
        // needed because of https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use & https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
            'error',
            { functions: false, classes: false, variables: true },
        ],
        'import/prefer-default-export': 'off',
        'import/no-unresolved': ['error', { ignore: ['^@', '^~'] }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    overrides: [
        {
            files: ['components/lab/sketches/*'],
            rules: {
                'no-param-reassign': 'off',
            },
        },
    ],
    settings: {
        'import/resolver': {
            'babel-module': {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['.'],
            },
        },
        react: {
            version: 'detect', // Automatically detect the react version
        },
    },
};
