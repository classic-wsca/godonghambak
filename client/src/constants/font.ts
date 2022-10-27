import { FontSizes } from '~types/font';

interface HeadingFontSizes {
  [key: string]: FontSizes;
}

export const HEADING_FONT_SIZES: HeadingFontSizes = {
  h1: '7xl',
  h2: '6xl',
  h3: '5xl',
  h4: '4xl',
  h5: '3xl',
  h6: '2xl',
};
