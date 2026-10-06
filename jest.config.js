// jest.config.js
module.exports = {
    preset: 'ts-jest',

    roots: [
        '<rootDir>'
    ],

    testEnvironment: 'node',

    transform: {
        '^.+\\.ts$': 'ts-jest'
    },

    moduleFileExtensions: ['ts', 'js', 'json'],

    testMatch: [
        '**/tests/**/*.test.ts'
    ],

    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts'
    ],

    // globals: {
    //     'ts-jest': {
    //         isolatedModules: true // más rápido, no ejecuta type-check
    //     }
    // },
};
