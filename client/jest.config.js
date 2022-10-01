const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/__tests__/*',
    '!<rootDir>/src/pages/_*.tsx',
    '!**/*.d.ts',
    '!**/*.stories.tsx',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '^~public/(.*)$': '<rootDir>/public/$1',
    '^~components/(.*)$': '<rootDir>/src/components/$1',
    '^~constants/(.*)$': '<rootDir>/src/constants/$1',
    '^~pages/(.*)$': '<rootDir>/src/pages/$1',
    '^~hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^~hocs/(.*)$': '<rootDir>/src/hocs/$1',
    '^~styles/(.*)$': '<rootDir>/src/styles/$1',
    '^~types/(.*)$': '<rootDir>/src/types/$1',
    '^~utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/test-utils.tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    '^.+\\.(svg)$': 'jest-transformer-svg',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = async (...args) => {
  const jestConfig = createJestConfig(customJestConfig);
  const customConfig = await jestConfig(...args);

  delete customConfig.moduleNameMapper['^.+\\.(svg)$'];

  return customConfig;
};
