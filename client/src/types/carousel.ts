import type { GlobalColors } from '~types/common';

export interface MainCarouselItems {
  title: string;
  subTitle: string;
  content: string;
  link: {
    text: string;
    href: string;
  };
  color: GlobalColors;
  imgUrl: string;
}
