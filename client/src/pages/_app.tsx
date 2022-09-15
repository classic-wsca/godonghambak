import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";

import { theme, breakPoints } from "~styles/theme";
import "~styles/global-style.ts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={{ ...theme, ...breakPoints }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
