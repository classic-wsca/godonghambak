import type { AppProps } from 'next/app';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from '~styles/global-style';
import { theme } from '~styles/theme';

import { Layout } from '~components/layout';

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
