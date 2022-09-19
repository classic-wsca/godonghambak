const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.js와 .env파일을 가리키는 경로를 제공한다.
  dir: './',
});

// 원하는 설정 추가하기
const customJestConfig = {
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // 절대 경로 설정
    '^~components/(.*)$': '<rootDir>/src/components/$1',
    '^~constants/(.*)$': '<rootDir>/src/constants/$1',
    '^~pages/(.*)$': '<rootDir>/src/pages/$1',
    '^~hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^~styles/(.*)$': '<rootDir>/src/styles/$1',
    '^~types/(.*)$': '<rootDir>/src/types/$1',
    '^~utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  // transform은 자바스크립트 파일이 아닌 것을 어떻게 처리할지 설정
  // 이미 typescript를 compile하는 babel 설정이 있다면 jsx, tsx 모두 babel-jest를 사용해도 된다.
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    // '^.+\\.(ts|tsx)$': ['ts-jest', { presets: ['next/babel'] }],
  },
  testPathIgnorePatterns: ['/node_modules/', '\\.cache'],
};

// createJestConfig는 next/jest가 비동기인 Next.js 설정을 불러올 수 있도록 이렇게 내보내기
module.exports = createJestConfig(customJestConfig);
