import {
  validateInput,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateLogin,
} from '~utils/validate-utils';

describe('Validate util function test', () => {
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
});
