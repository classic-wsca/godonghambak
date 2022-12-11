import type {
  FormField,
  FormErrorMessage,
  LoginInformation,
  JoinInformation,
} from '~types/form';

export const getKeysOfObject = <T extends {}>(intialvalues: T) =>
  Object.keys(intialvalues).reduce((acc, cur) => {
    acc[cur as keyof T] = cur;
    return acc;
  }, {} as Record<keyof T, string>);

export const FORM_FIELD_STATUS = Object.freeze({
  success: 'success',
  error: 'error',
  default: 'default',
});

export const FORM_ERROR_MESSAGES: FormErrorMessage = Object.freeze({
  notExist: Object.freeze({
    email: '이메일을 입력해 주세요.',
    emailVerificationCode: '인증번호를 입력해 주세요.',
    password: '비밀번호를 입력해 주세요.',
    passwordConfirm: '비밀번호 확인이 필요합니다.',
    name: '이름을 입력해 주세요',
    phoneNumber: '휴대폰 번호를 입력해 주세요.',
    birth: '생년월일을 입력해 주세요.',
  }),
  invalidFormat: Object.freeze({
    email: '올바른 이메일 형식이 아닙니다.',
    emailVerificationCode: '전송받은 인증번호 6자리를 입력해 주세요.',
    password: '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
    passwordConfirm: '입력한 비밀번호와 다릅니다.',
    name: '올바른 이름이 아닙니다.',
    phoneNumber: '올바른 휴대폰 번호 형식이 아닙니다.',
    birth: '올바른 생년월일 6자리를 입력해 주세요.',
  }),
  failVerification: '인증 코드가 만료되었습니다. 다시 인증 해주세요.',
});

export const INITIAL_LOGIN_VALUE: LoginInformation = {
  email: '',
  password: '',
};

export const LOGIN_FORM_FIELDS: FormField[] = [
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

export const INITIAL_JOIN_VALUE: JoinInformation = {
  email: '',
  emailVerificationCode: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phoneNumber: '',
  birth: '',
};

export const JOIN_FIELD_KEYS = getKeysOfObject(INITIAL_JOIN_VALUE);

export const JOIN_FORM_FIELDS: FormField[] = [
  ...LOGIN_FORM_FIELDS,
  {
    id: 'name',
    type: 'text',
    placeholder: '이름을 입력해 주세요.',
    text: '이름',
  },
  {
    id: 'phoneNumber',
    type: 'tel',
    placeholder: '휴대폰 번호를 입력해 주세요. (-없이 숫자만 입력)',
    text: '휴대폰 번호',
  },
  {
    id: 'birth',
    type: 'text',
    placeholder: '생년월일 6자리를 입력해 주세요.',
    text: '생년월일 6자리',
  },
];
