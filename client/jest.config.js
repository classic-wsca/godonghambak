const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/src/__tests__/test-utils.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^~components/(.*)$': '<rootDir>/src/components/$1',
    '^~constants/(.*)$': '<rootDir>/src/constants/$1',
    '^~pages/(.*)$': '<rootDir>/src/pages/$1',
    '^~hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^~styles/(.*)$': '<rootDir>/src/styles/$1',
    '^~types/(.*)$': '<rootDir>/src/types/$1',
    '^~utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '\\.cache',
    '<rootDir>/src/__tests__/test-utils.tsx',
  ],
};

module.exports = createJestConfig(customJestConfig);
