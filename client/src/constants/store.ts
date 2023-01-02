export interface Location {
  latitude: number;
  longitude: number;
}

export interface StoreInfo {
  address: string;
  breaktime: string;
  businesshours: string;
  contact: string;
  image: string;
  kiosk: boolean;
  lastorder: string;
  name: string;
  parking: boolean;
  wifi: boolean;
  location: Location;
}

export const INITIAL_STORE = {
  address: '',
  breaktime: '',
  businesshours: '',
  contact: '',
  image: '',
  kiosk: true,
  lastorder: '',
  name: '',
  parking: true,
  wifi: true,
  location: {
    latitude: 0,
    longitude: 0,
  },
};

export const STORE_LIST: StoreInfo[] = [
  {
    address: '서울 영등포구 경인로 72길 6 1층',
    breaktime: '15:00 ~ 16:30',
    businesshours: '10:30 ~ 21:00',
    contact: '02-2671-7123',
    image: '/images/store.png',
    kiosk: true,
    lastorder: '20:30',
    name: '신도림점',
    parking: false,
    wifi: true,
    location: {
      latitude: 37.51068285720683,
      longitude: 126.89212824768695,
    },
  },
  {
    address: '서울 송파구 백제고분로 41길 36-6 1층',
    breaktime: '15:00 ~ 16:30',
    businesshours: '10:30 ~ 21:00',
    contact: '02-2202-7123',
    image: '/images/store02.png',
    kiosk: true,
    lastorder: '20:30',
    name: '송리단길점',
    parking: false,
    wifi: true,
    location: {
      latitude: 37.50892491356066,
      longitude: 127.1064752276593,
    },
  },
  {
    address: '인천 연수구 하모니로 158 에이 124호',
    breaktime: '15:00 ~ 16:30',
    businesshours: '10:30 ~ 21:00',
    contact: '032-710-0440',
    image: '/images/store03.jpg',
    kiosk: true,
    lastorder: '20:30',
    name: '송도 타임스페이스점',
    parking: true,
    wifi: true,
    location: {
      latitude: 37.38329171651462,
      longitude: 126.64225256184388,
    },
  },
  {
    address: '인천 연수구 청능대로 210 스퀘어원 3층',
    breaktime: '15:00 ~ 16:30',
    businesshours: '10:30 ~ 21:00',
    contact: '02-2671-7123',
    image: '/images/store04.jpg',
    kiosk: true,
    lastorder: '20:30',
    name: '인천 스퀘어원점',
    parking: true,
    wifi: true,
    location: {
      latitude: 37.40599635286855,
      longitude: 126.68361901839418,
    },
  },
];

export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
