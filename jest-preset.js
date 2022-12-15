module.exports = {
    preset: 'jest',
    testEnvironment: 'node',
    type: "module",
    transform: {
        '^.+\\.ts?$': 'jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};