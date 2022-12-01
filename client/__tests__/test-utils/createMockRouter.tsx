import type { NextRouter } from 'next/router';

export const createMockRouter = (
  customRouter?: Partial<NextRouter>,
): NextRouter => ({
  basePath: '',
  route: '/',
  pathname: '/',
  query: {},
  asPath: `/`,
  back: jest.fn(),
  beforePopState: jest.fn(),
  prefetch: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  events: {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  defaultLocale: 'ko',
  domainLocales: [],
  ...customRouter,
});
