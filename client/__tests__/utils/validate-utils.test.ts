import { JOIN_FIELD_KEYS } from '~constants/join';
import {
  validateJoinForm,
  validateJoinInput,
  validateLogin,
  validateInput,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateName,
  validateBirth,
  isEqual,
} from '~utils/validate-utils';

describe('validateJoinForm 함수 테스트', () => {
  it('필드에 값이 없다면 값이 없다는 메시지를 담은 객체를 반환해야 한다.', () => {
    // given
    const fields = {
      email: '',
      emailVerificationCode: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phoneNumber: '',
      birth: '',
    };

    // when
    const errors = validateJoinForm(fields);

    // then
    expect(errors).toEqual({
      email: '이메일을 입력해 주세요.',
      emailVerificationCode: '인증번호를 입력해 주세요.',
      password: '비밀번호를 입력해 주세요.',
      name: '이름을 입력해 주세요',
      phoneNumber: '휴대폰 번호를 입력해 주세요.',
      birth: '생년월일을 입력해 주세요.',
    });
  });

  it('필드에 값이 유효한 형식이 아니라면 유효한 형식이 아니라는 메시지를 담은 객체를 반환해야 한다.', () => {
    // given
    const fields = {
      email: 'example',
      emailVerificationCode: '1234',
      password: 'exmaple',
      passwordConfirm: 'exam',
      name: 'example',
      phoneNumber: 'example',
      birth: 'example',
    };

    // when
    const errors = validateJoinForm(fields);

    // then
    expect(errors).toEqual({
      email: '올바른 이메일 형식이 아닙니다.',
      emailVerificationCode: '전송받은 인증번호 6자리를 입력해 주세요.',
      password: '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
      passwordConfirm: '입력한 비밀번호와 다릅니다.',
      name: '올바른 이름이 아닙니다.',
      phoneNumber: '올바른 휴대폰 번호 형식이 아닙니다.',
      birth: '올바른 생년월일 6자리를 입력해 주세요.',
    });
  });

  it('모든 필드에 올바른 값을 입력받았다면 빈 객체를 반환해야 한다.', () => {
    // given
    const fields = {
      email: 'example@gamil.com',
      emailVerificationCode: '123456',
      password: 'example1234!',
      passwordConfirm: 'example1234!',
      name: '홍길동',
      phoneNumber: '010-1234-5678',
      birth: '000101',
    };
    const verificationCode = '123456';

    // when
    const errors = validateJoinForm(fields, verificationCode);

    // then
    expect(errors).toEqual({});
  });
});

describe('validateJoinInput 함수 테스트', () => {
  it('입력값이 빈 문자열이라면 false를 반환해야 한다.', () => {
    // given
    const VALIDATE_KEYS = Object.keys(JOIN_FIELD_KEYS);
    const value = '';

    VALIDATE_KEYS.forEach((key) => {
      // when
      const result = validateJoinInput(value, key);

      // then
      expect(result).toBe(false);
    });
  });

  it.each(['hi', 'example', 'test'])(
    'email, emailVerficationCode, password, passwordConfirm, phoneNumber, name, birth가 아닌 값을 name 인자로 받게 되면 에러를 발생시켜야 한다.',
    (name) => {
      // given
      const value = 'example@gmail.com';

      // when
      // then
      expect(() => {
        validateJoinInput(value, name);
      }).toThrow();
    },
  );

  it.each(['example', 'example@', 'example@gmail'])(
    '올바른 이메일이 아니라면 false를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateJoinInput(value, 'email');

      // then
      expect(result).toBe(false);
    },
  );

  it.each([
    'example@gmail.com',
    'example1234@gmail.com',
    '12example@naver.com',
  ])('올바른 이메일이라면 true를 반환해야 한다.', (value) => {
    // given
    // when
    const result = validateJoinInput(value, 'email');

    // then
    expect(result).toBe(true);
  });

  it.each(['example', 'example123', 'exa12@', 'example!', 'test123password!'])(
    '7-15자리의 영문 소문자, 숫자, 특수만자로 이루어진 비밀번호가 아니라면 false를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateJoinInput(value, 'password');

      // then
      expect(result).toBe(false);
    },
  );

  it.each(['example1234!', 'test123pass!', 'q1w2e3r4!'])(
    '7-15자의 영문 소문자, 숫자 특수문자로 이루어진 비밀번호라면 true를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateJoinInput(value, 'password');

      // then
      expect(result).toBe(true);
    },
  );

  it.each(['0421231234', '0101234', '010123412'])(
    '휴대폰 번호 형식이 아닌 번호라면 false를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateJoinInput(value, 'phoneNumber');

      // then
      expect(result).toBe(false);
    },
  );

  it.each([
    '01012345678',
    '01612345678',
    '0111234567',
    '01708080808',
    '0180909090',
    '0192345678',
  ])('올바른 휴대폰 번호 형식의 번호라면 true를 반환해야 한다.', (value) => {
    // given
    // when
    const result = validateJoinInput(value, 'phoneNumber');

    // then
    expect(result).toBe(true);
  });

  it.each([
    '홍',
    '김 이름',
    'ㅗ기현',
    '가나다라마바사아자카타파하가나다',
    'asdg',
  ])(
    '올바른 한글로 이루어진 2-15자의 이름이 아니라면 false를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateJoinInput(value, 'name');

      // then
      expect(result).toBe(false);
    },
  );

  it.each(['홍길동', '김산', '열다섯글자내의이름'])(
    '올바른 한글로 이루어진 2-15자의 이름이라면 true를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateJoinInput(value, 'name');

      // then
      expect(result).toBe(true);
    },
  );

  it.each([
    '0128',
    '000138',
    '920230',
    '930431',
    '030631',
    '980931',
    '991131',
    '12345678',
  ])(
    '6자의 생년월일이 아니거나 올바르지 않을 경우 false를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateJoinInput(value, 'birth');

      // then
      expect(result).toBe(false);
    },
  );

  it.each(['091130', '950229', '020430'])(
    '올바른 6자의 생년월일의 경우 true를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateJoinInput(value, 'birth');

      // then
      expect(result).toBe(true);
    },
  );

  it.each([
    ['123456', 'emailVerificationCode'],
    ['password1234!', 'passwordConfirm'],
  ])(
    '이메일 인증 코드와 비밀번호 확인 검증은 비교값을 전달받지 못하면 false를 반환해야 한다.',
    (value, name) => {
      // given
      // when
      const result = validateJoinInput(value, name);

      // then
      expect(result).toBe(false);
    },
  );

  it.each([
    ['123456', 'emailVerificationCode', '123489'],
    ['password1234!', 'passwordConfirm', 'example1234!'],
  ])(
    '이메일 인증 코드와 비밀번호 확인 검증은 비교값과 다르다면 false를 반환해야 한다.',
    (value, name, compareValue) => {
      // given
      // when
      const result = validateJoinInput(value, name, compareValue);

      // then
      expect(result).toBe(false);
    },
  );

  it.each([
    ['123456', 'emailVerificationCode', '123456'],
    ['password1234!', 'passwordConfirm', 'password1234!'],
  ])(
    '이메일 인증 코드와 비밀번호 확인 검증은 비교값과 같다면 true를 반환해야 한다.',
    (value, name, compareValue) => {
      // given
      // when
      const result = validateJoinInput(value, name, compareValue);

      // then
      expect(result).toBe(true);
    },
  );
});

describe('validateLogin', () => {
  it('이메일 값이 없다면, 반환할 객체에 이메일이 없다는 메시지를 담아 반환해야 한다.', () => {
    // given
    const email = '';
    const password = 'example1234!';

    // when
    const errors = validateLogin({ email, password });

    // then
    expect(errors).toEqual({ email: '이메일을 입력해 주세요.' });
  });

  it('이메일 값이 올바르지 않다면, 반환할 객체에 이메일 형식이 올바르지 않다는 메시지를 담아 반환해야 한다.', () => {
    // given
    const email = 'example';
    const password = 'example1234!';

    // when
    const errors = validateLogin({ email, password });

    // then
    expect(errors).toEqual({ email: '유효하지 않은 이메일 형식입니다.' });
  });

  it('비밀번호 값이 없다면, 반환할 객체에 비밃번호가 없다는 메시지를 담아 반환해야 한다.', () => {
    // given
    const email = 'example@gmail.com';
    const password = '';

    // when
    const errors = validateLogin({ email, password });

    // then
    expect(errors).toEqual({ password: '비밀번호를 입력해 주세요.' });
  });

  it('비밀번호 형식이 올바르지 않다면, 반환할 객체에 비밃번호 형식이 올바르지 않다는 메시지를 담아 반환해야 한다.', () => {
    // given
    const email = 'example@gmail.com';
    const password = 'example';

    // when
    const errors = validateLogin({ email, password });

    // then
    expect(errors).toEqual({
      password: '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
    });
  });

  it('이메일과 비밀번호 모두 값이 없을 경우, 이메일과 비밀번호가 없다는 메시지를 담은 객체를 반환해야 한다.', () => {
    // given
    const email = '';
    const password = '';

    // when
    const errors = validateLogin({ email, password });

    // then
    expect(errors).toEqual({
      email: '이메일을 입력해 주세요.',
      password: '비밀번호를 입력해 주세요.',
    });
  });

  it('이메일과 비밀번호 모두 올바른 형식이 아닐 경우, 두 가지 모두 올바르지 않은 형식이라는 메시지를 담은 객체를 반환해야 한다.', () => {
    // given
    const email = 'exmaple';
    const password = 'example';

    // when
    const errors = validateLogin({ email, password });

    // then
    expect(errors).toEqual({
      email: '유효하지 않은 이메일 형식입니다.',
      password: '비밀번호 7-15자리 영문과 숫자, 특수문자를 포함해야 합니다.',
    });
  });

  it('올바른 이메일과 비밀번호의 경우 빈 객체를 반환해야 한다.', () => {
    // given
    const email = 'example@gmail.com';
    const password = 'example1234!';

    // when
    const errors = validateLogin({ email, password });

    // then
    expect(errors).toEqual({});
  });
});

describe('Validate input', () => {
  it('should return null if value is empty', () => {
    expect(validateInput('')).toBe(null);
  });

  it('should return null when type is not email, password and tel', () => {
    expect(validateInput('hi', 'text')).toBe(null);
    expect(validateInput('', 'radio')).toBe(null);
    expect(validateInput('', 'checkbox')).toBe(null);
    expect(validateInput('', 'button')).toBe(null);
  });

  it('should validate email value', () => {
    expect(validateInput('example', 'email')).toBe(false);
    expect(validateInput('example@gmail.com', 'email')).toBe(true);
  });

  it('should validate password value', () => {
    expect(validateInput('password', 'password')).toBe(false);
    expect(validateInput('password123!', 'password')).toBe(true);
  });

  it('should validate phone number value', () => {
    expect(validateInput('0101', 'tel')).toBe(false);
    expect(validateInput('01012345678', 'tel')).toBe(true);
    expect(validateInput('010-1234-5678', 'tel')).toBe(true);
    expect(validateInput('011-123-4567', 'tel')).toBe(true);
  });

  it('입력받은 이름이 올바른 이름 형식인지 검증할 수 있어야 한다.', () => {
    expect(validateInput('홍', 'name')).toBe(false);
    expect(validateInput('홍길', 'name')).toBe(true);
    expect(validateInput('홍길동', 'name')).toBe(true);
    expect(validateInput('내이름은홍길동', 'name')).toBe(true);
    expect(validateInput('내이름은홍길동인데열다섯자가넘어', 'name')).toBe(
      false,
    );
    expect(validateInput('홍 길동', 'name')).toBe(false);
    expect(validateInput('honggildong', 'name')).toBe(false);
  });
});

describe('Validate email', () => {
  it('should return false value is not email format', () => {
    expect(validateEmail('1234')).toBe(false);
    expect(validateEmail('이메일')).toBe(false);
    expect(validateEmail('example')).toBe(false);
    expect(validateEmail('example@gmail')).toBe(false);
  });

  it('should return true value is email format', () => {
    expect(validateEmail('example@gmail.com')).toBe(true);
    expect(validateEmail('asdf123@naver.com')).toBe(true);
    expect(validateEmail('123adf@email.com')).toBe(true);
  });
});

describe('Validate password', () => {
  it('should has alphabets and at least more than 1 number and special letter', () => {
    expect(validatePassword('비밀번호123!')).toBe(false);
    expect(validatePassword('password')).toBe(false);
    expect(validatePassword('example')).toBe(false);
    expect(validatePassword('password123!')).toBe(true);
    expect(validatePassword('!123example')).toBe(true);
  });

  it('should has more than 7 length of value', () => {
    expect(validatePassword('pass1!')).toBe(false);
    expect(validatePassword('pass1!')).toBe(false);
    expect(validatePassword('password123!')).toBe(true);
    expect(validatePassword('!123example')).toBe(true);
  });

  it('should has less than 15 lenght of value', () => {
    expect(validatePassword('password1234567!')).toBe(false);
    expect(validatePassword('!!!!123exa45mple')).toBe(false);
  });
});

describe('validateName 함수 테스트', () => {
  it('입력값이 빈 문자열일 경우 false를 반환해야 한다.', () => {
    // given
    const value = '';

    // when
    const result = validateName(value);

    // then
    expect(result).toBe(false);
  });

  it.each(['김', '이', '고', '최', '박'])(
    '입력값이 두 글자 미만일 경우 false를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateName(value);

      // then
      expect(result).toBe(false);
    },
  );

  it.each(['김상ㅣ', 'ㅗ이현', 'asdf', '홍 길동'])(
    '입력값이 올바른 한글이 아닐 경우 false를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateName(value);

      // then
      expect(result).toBe(false);
    },
  );

  it('입력값이 15자가 넘어갈 경우 false를 반환해야 한다.', () => {
    // given
    const value = '가나다라마바사아자차카타파하가나';

    // when
    const result = validateName(value);

    // then
    expect(result).toBe(false);
  });

  it.each(['김산', '홍길동', '남궁세가', '이것도이름인가'])(
    '입력값이 두 글자에서 열다섯 글자 이내의 올바른 한글로 이루어진 이름이라면 true를 반환해야 한다.',
    (value) => {
      // given
      // when
      const result = validateName(value);

      // then
      expect(result).toBe(true);
    },
  );
});

describe('Validate phone number', () => {
  it('should has value more than 9 and less than 12 digits', () => {
    expect(validatePhoneNumber('010')).toBe(false);
    expect(validatePhoneNumber('010-1234')).toBe(false);
    expect(validatePhoneNumber('010-1234-567')).toBe(false);
    expect(validatePhoneNumber('010-1234-56789')).toBe(false);
    expect(validatePhoneNumber('010-123-5678')).toBe(true);
    expect(validatePhoneNumber('010-1234-5678')).toBe(true);
    expect(validatePhoneNumber('010-0000-0000')).toBe(true);
  });

  it('should has value start 01[016789]', () => {
    expect(validatePhoneNumber('123-1234-5678')).toBe(false);
    expect(validatePhoneNumber('012-1234-5678')).toBe(false);
    expect(validatePhoneNumber('013-1234-5678')).toBe(false);
    expect(validatePhoneNumber('014-1234-5678')).toBe(false);
    expect(validatePhoneNumber('015-1234-5678')).toBe(false);
    expect(validatePhoneNumber('010-1234-5678')).toBe(true);
    expect(validatePhoneNumber('016-1234-5678')).toBe(true);
    expect(validatePhoneNumber('017-1234-5678')).toBe(true);
    expect(validatePhoneNumber('018-1234-5678')).toBe(true);
    expect(validatePhoneNumber('019-1234-5678')).toBe(true);
  });
});

describe('validateBirth 함수 테스트', () => {
  it.each(['0111', '', '01130', '20000101'])(
    '6자리의 수가 아니라면 false를 반환해야 한다.',
    (value) => {
      // given
      // when
      // then
      expect(validateBirth(value)).toBe(false);
    },
  );

  it.each(['000130', '901211', '101010'])(
    '올바른 생년월일 6자리를 입력받았을 경우 true를 반환해야 한다.',
    (value) => {
      // given
      // when
      // then
      expect(validateBirth(value)).toBe(true);
    },
  );

  it.each(['000431', '020631', '990931', '901131'])(
    '4, 6, 9, 11월의 경우 31일이 없으므로 false를 반환해야 한다.',
    (value) => {
      // given
      // when
      // then
      expect(validateBirth(value)).toBe(false);
    },
  );

  it('2월은 29일까지 날짜로 인정되고, 30일 이상은 false를 반환해야 한다.', () => {
    // given
    // when
    // then
    expect(validateBirth('000228')).toBe(true);
    expect(validateBirth('000229')).toBe(true);
    expect(validateBirth('000230')).toBe(false);
  });
});

describe('isEqual 함수 테스트', () => {
  it.each([
    ['', ''],
    ['a', 'a'],
    [3, 3],
    [undefined, undefined],
    [null, null],
  ])('두개의 인자가 같다면 true를 반환해야 한다.', (a, b) => {
    // given
    // when
    // then
    expect(isEqual(a, b)).toBe(true);
  });

  it.each([
    ['', undefined],
    ['', null],
    ['a', 'ab'],
    [3, 4],
  ])('두개의 인자가 다르다면 false를 반환해야 한다.', (a, b) => {
    // given
    // when
    // then
    expect(isEqual(a, b)).toBe(false);
  });
});
