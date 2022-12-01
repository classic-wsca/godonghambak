import type { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';

import { Layout } from '~components/layout';
import GlobalStyle from '~styles/global-style';
import { theme } from '~styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
