import type { HTMLInputTypeAttribute } from 'react';

interface LoginFormField {
  id: string;
  type: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'password' | 'tel'>;
  placeholder: string;
  text: string;
}

export const INITIAL_LOGIN_VALUE = {
  email: '',
  password: '',
};

export const LOGIN_PHRASES = Object.freeze({
  title: '로그인',
  phrase: '즐거움과 재미가 가득한 고동함박에 오신 것을 환영합니다!',
});

export const LOGIN_ERROR_MESSAGES = Object.freeze({
  noEmail: '이메일을 입력해 주세요.',
  noPassword: '비밀번호를 입력해 주세요.',
  invalidEmailFormat: '유효하지 않은 이메일 형식입니다.',
  invalidPasswordFormat:
    '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
  notFound: '이메일 혹은 비밀번호를 찾을 수 없습니다.',
});

export const LOGIN_FORM_FIELDS: LoginFormField[] = [
  {
    id: 'email',
    type: 'email',
    placeholder: '아이디를 입력해 주세요. (이메일 주소 포함)',
    text: '이메일',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력해 주세요.',
    text: '비밀번호',
  },
];

export const LOGIN_RELATED_PAGES = [
  {
    link: 'find-email',
    text: '이메일 찾기',
  },
  {
    link: 'find-password',
    text: '비밀번호 찾기',
  },
  {
    link: 'join',
    text: '회원가입',
  },
];
