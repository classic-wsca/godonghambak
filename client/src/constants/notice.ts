export interface NoticeInfo {
  id: number;
  type: string;
  title: string;
  date: string;
  content: string;
  hits: number;
}

export const INITIAL_NOTICE: NoticeInfo = {
  id: 0,
  type: 'notice',
  title: '',
  date: '',
  content: '',
  hits: 0,
};

export const NOTICES: NoticeInfo[] = [
  {
    id: 1,
    type: 'notice',
    title: '고동함박 홈페이지 리뉴얼 안내',
    date: '2022-08-04',
    content:
      '안녕하세요. 고동함박입니다.\n\n 고동함박의 홈페이지가 오늘을 기점으로 새롭게 리뉴얼 되었습니다.\n 새롭게 변화된 고동함박을 둘러보시고 불편사항이 있으시다면 문의 부탁드립니다!',
    hits: 0,
  },
  {
    id: 2,
    type: 'notice',
    title: '고동함박 송리단길점 오픈',
    date: '2022-09-01',
    content:
      '안녕하세요. 고동함박입니다.\n\n 드디어 고동함박 송리단길점이 오픈했습니다! 아이들은 물론 누구나 좋아하는 메뉴 함박!\n 갓 구운 육즙 가득 품은 100% 국내산 수제 함박스테이크 고동함박을 이제 석촌호수 맛집으로 만나실 수 있습니다.\n\n현재 이벤트로 배달의 민족 배달팁 무료행사를 진행하고 있습니다.\n 고동함박의 두툼한 함박을 집에서도 저렴하게 먹어볼 수 있는 기회!  (이벤트는 9월 중 종료됩니다.)\n \n롯데월드, 잠실, 석촌호수 근처의 맛집을 찾으신다면 고동함박 송리단길점을 방문해주세요! ',
    hits: 0,
  },
  {
    id: 3,
    type: 'notice',
    title: '추석 연휴 기간 내 매장 휴업 안내',
    date: '2022-09-04',
    content:
      '안녕하세요. 고동함박입니다.\n\n 이번 추석 연휴 동안 열심히 달려온 저희 고동함박이 휴가를 가려고 합니다.\n 추석 기간 동안 고동함박을 원하는 고객분들께 죄송한 마음이지만, \n이번 기회에 더 맛있는 음식을 제공해드리기 위해 저희의 몸과 마음을 고객님에 대한 사랑으로 가득 채워서 돌아오겠습니다.\n\n그럼 다음에 만나요!',
    hits: 0,
  },
];
