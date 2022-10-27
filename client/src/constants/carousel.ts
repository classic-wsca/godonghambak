import type { GlobalColors } from '~types/common';

interface CarouselItem {
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

export const MAIN_CAROUSEL_ITEMS: CarouselItem[] = [
  {
    title: '고동함박',
    subTitle: '육즙 가득 품은 함박 스테이크',
    content:
      '혜자씨, 고동이, 고순이가\n함께 만드는 두툼한 함박 스테이크와\n외할머니의 손맛이 느껴지는\n새콤달콤한 함박스떼끼 소스까지!',
    link: {
      text: '브랜드 소개',
      href: '/brand',
    },
    color: 'green',
    imgUrl: '/images/godonghambak.png',
  },
  {
    title: '송리단길점 오픈',
    subTitle: '고동함박의 두번째 도전',
    content:
      '신도림 맛집 고동함박이\n여러분을 위해 두번째 매장을 오픈합니다!\n석촌호수 근처에서 맛보는\n 고동함박을 기대해주세요!',
    link: {
      text: '보러가기',
      href: '/store?name=songlidangil',
    },
    color: 'orange',
    imgUrl: '/images/store.png',
  },
  {
    title: '중독성 있는 맛',
    subTitle: '고동함박만의 특별한 레시피',
    content:
      '고동함박의 메뉴를 맛보면\n다들 같은 말을 해요. 또 먹고 싶다...!\n한번 맛보면 잊을 수 없는 그 맛!\n한 번 보러가볼까요?',
    link: {
      text: '메뉴 보러가기',
      href: '/menu',
    },
    color: 'red',
    imgUrl: '/images/ggalmaehambak.png',
  },
];

export const MENU_CAROUSEL_ITEMS: Pick<CarouselItem, 'title' | 'imgUrl'>[] = [
  {
    title: '고동함박',
    imgUrl: '/images/menu-01.png',
  },
  {
    title: '깔매함박',
    imgUrl: '/images/menu-02.png',
  },
  {
    title: '고동까스',
    imgUrl: '/images/menu-03.png',
  },
  {
    title: '로제함박',
    imgUrl: '/images/menu-04.png',
  },
  {
    title: '월클함박',
    imgUrl: '/images/menu-05.png',
  },
  {
    title: '함박파스타',
    imgUrl: '/images/menu-06.png',
  },
  {
    title: '혜자버거',
    imgUrl: '/images/menu-07.png',
  },
  {
    title: '돈까스',
    imgUrl: '/images/menu-08.png',
  },
  {
    title: '쫄면',
    imgUrl: '/images/menu-09.png',
  },
];

export const CHARACTER_CAROUSEL_ITEMS = [
  {
    src: '/images/character-godong.png',
    alt: '고동이',
  },
  {
    src: '/images/character-gosoon.png',
    alt: '고순이',
  },
  {
    src: '/images/character-hyeja.png',
    alt: '혜자씨',
  },
];
