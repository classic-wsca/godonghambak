import type { NextRouter } from 'next/router';
import * as nextRouter from 'next/router';
import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '~styles/global-style';
import { theme } from '~styles/theme';

const mockUseNextRouter = jest.spyOn(nextRouter, 'useRouter');

const createMockedRouter = (overrides?: Partial<NextRouter>): NextRouter => ({
  basePath: '',
  route: '/',
  pathname: '/',
  query: {},
  asPath: `/`,
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(() => Promise.resolve()),
  beforePopState: jest.fn(),
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
  ...overrides,
});

export const mockNextRouter = (overrides: Partial<NextRouter> = {}) => {
  const mockRouter = createMockedRouter(overrides);
  mockUseNextRouter.mockReturnValue(mockRouter);

  return mockRouter;
};

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
