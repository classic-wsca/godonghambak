import type { Color, FontSize, BreakPoint } from './theme';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Color;
    fontSizes: FontSize;
    breakPoints: BreakPoint;
  }
}
