export default {
    'preset': 'react-native',
    'transform': {
        '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
        '^.+\\.tsx?$': 'ts-jest',
    },
    'globals': {
        'ts-jest': {
            'tsConfigFile': 'tsconfig.jest.json',
        },
    },
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    'modulePaths': [
        '<rootDir>',
    ],
    'setupFiles': [
        './jest.setup.js',
    ],
    'testPathIgnorePatterns': [
        '<rootDir>/example/',
    ],
};
