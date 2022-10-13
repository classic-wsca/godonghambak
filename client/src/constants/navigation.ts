import type { NavigationRoutes } from '~types/navigation';

export const NAVIGATION_ROUTES: NavigationRoutes[] = [
  {
    text: '고동함박',
    href: '/brand',
    subRoutes: [
      { text: '브랜드 소개', href: '/brand' },
      { text: '매장 찾기', href: '/store' },
    ],
  },
  {
    text: '메뉴 소개',
    href: '/menu',
    subRoutes: [
      { text: '세트 메뉴', href: '/menu?category=set' },
      { text: '함박 메뉴', href: '/menu?category=hambak' },
      { text: '특별한 메뉴', href: '/menu?category=special' },
      { text: '추가 메뉴', href: '/menu?category=side' },
      { text: '음료/주류', href: '/menu?category=drink' },
    ],
  },
  {
    text: '창업 안내',
    href: '/franchise',
    subRoutes: [{ text: '가맹점 개설 안내', href: '/franchise' }],
  },
  {
    text: '새로운 소식',
    href: '/notice',
    subRoutes: [
      { text: '공지사항', href: '/notice' },
      { text: '소식 및 이벤트', href: '/events' },
    ],
  },
];

export const FOOTER_NAVIGATION_ROUTES: Omit<NavigationRoutes, 'href'>[] = [
  {
    text: '고객 지원',
    subRoutes: [
      {
        text: '문의하기 (Contact Us)',
        href: '/franchise#contact',
        highlight: true,
      },
      {
        text: '대표번호 1533-0788',
        href: 'tel:1533-0788',
      },
      { text: '메뉴 소개', href: '/menu' },
      {
        text: '매장 찾기',
        href: '/store',
      },
    ],
  },
  {
    text: '파트너 지원',
    subRoutes: [
      {
        text: '가맹 문의',
        href: '/franchise',
      },
      {
        text: '브랜드 소개',
        href: '/brand',
      },
    ],
  },
  {
    text: '안내 사항',
    subRoutes: [
      {
        text: '공지 사항',
        href: '/notice',
      },
      {
        text: '소식 및 이벤트',
        href: '/event',
      },
    ],
  },
];
