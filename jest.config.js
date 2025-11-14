// jest.config.js
module.exports = {
    preset: 'ts-jest',

    roots: [
        '<rootDir>/src'
    ],

    testEnvironment: 'node',

    transform: {
        '^.+\\.ts$': 'ts-jest'
    },

    moduleFileExtensions: ['ts', 'js', 'json'],

    testMatch: [
        '**/__tests__/**/*.test.ts',
        '**/?(*.)+(test).ts'
    ],

    // globals: {
    //     'ts-jest': {
    //         isolatedModules: true // más rápido, no ejecuta type-check
    //     }
    // },
};
