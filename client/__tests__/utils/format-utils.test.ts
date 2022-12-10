import {
  convertNumberToTime,
  formatDigits,
  formatPhoneNumber,
} from '~utils/format-utils';

describe('입력받은 십진수를 시간 단위 별로 환산해주는 함수 convertNumberToTime 테스트', () => {
  const getTimeUnits = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => {
    return { days, hours, minutes, seconds };
  };

  it.each([0, 1, 4, 32, 59])(
    '초 단위(0이상 60미만)의 수를 환산할 수 있어야 한다.',
    (number) => {
      // given
      // when
      const time = convertNumberToTime(number);

      // then
      expect(time).toEqual(getTimeUnits({ seconds: number }));
    },
  );

  it.each([
    [60, [1, 0]],
    [61, [1, 1]],
    [300, [5, 0]],
    [1768, [29, 28]],
    [3599, [59, 59]],
  ])(
    '분 단위(60이상 3600 미만)의 수를 환산할 수 있어야 한다.',
    (number, [minutes, seconds]) => {
      // given
      // when
      const time = convertNumberToTime(number);

      // then
      expect(time).toEqual(getTimeUnits({ minutes, seconds }));
    },
  );

  it.each([
    [3600, [1, 0, 0]],
    [3693, [1, 1, 33]],
    [14768, [4, 6, 8]],
    [69207, [19, 13, 27]],
    [86399, [23, 59, 59]],
  ])(
    '시간 단위(3600이상 86400미만)의 수를 환산할 수 있어야 한다.',
    (number, [hours, minutes, seconds]) => {
      // given
      // when
      const time = convertNumberToTime(number);

      // then
      expect(time).toEqual(getTimeUnits({ hours, minutes, seconds }));
    },
  );

  it.each([
    [86400, [1, 0, 0, 0]],
    [86401, [1, 0, 0, 1]],
    [173529, [2, 0, 12, 9]],
    [3826475, [44, 6, 54, 35]],
    [38264759, [442, 21, 5, 59]],
  ])(
    '날짜 단위(86400이상)의 수를 환산할 수 있어야 한다.',
    (number, [days, hours, minutes, seconds]) => {
      // given
      // when
      const time = convertNumberToTime(number);

      // then
      expect(time).toEqual(getTimeUnits({ days, hours, minutes, seconds }));
    },
  );

  it('음수를 입력하면 에러가 발생해야 한다.', () => {
    // given
    const number = -1;

    // when
    // then
    expect(() => convertNumberToTime(number)).toThrow();
  });

  it('입력값이 Number.MAX_SAFE_INTEGER 보다 크다면 에러가 발생해야 한다.', () => {
    // given
    const number = Number.MAX_SAFE_INTEGER + 1;

    // when
    // then
    expect(() => convertNumberToTime(number)).toThrow();
  });

  it('소수점을 포함한 수를 입력 시에 소수점 아래를 버리고 환산해야 한다.', () => {
    // given
    const number = 12.93984892;

    // when
    const time = convertNumberToTime(number);

    // then
    expect(time).toEqual(getTimeUnits({ seconds: 12 }));
  });
});

describe('숫자를 원하는 자릿수의 문자열로 변경해주는 formatDigits 함수 테스트', () => {
  it('지정한 자릿수에 채울 문자열을 지정하지 않으면 0으로 채워야 한다.', () => {
    // given
    const number = 4;
    const maxLength = 2;

    // when
    const formatted = formatDigits(number, maxLength);

    // then
    expect(formatted).toBe('04');
  });

  it.each([
    [2, '04'],
    [3, '004'],
    [4, '0004'],
  ])(
    '지정한 자릿수로 문자열을 채워 변경할 수 있어야 한다.',
    (maxLength, expected) => {
      // given
      const number = 4;

      // when
      const formatted = formatDigits(number, maxLength);

      // then
      expect(formatted).toBe(expected);
    },
  );

  it('0이 아닌 다른 문자열로도 자릿수를 채울 수 있어야 한다.', () => {
    // given
    const number = 4;
    const maxLength = 2;
    const fillString = '2';

    // when
    const formatted = formatDigits(number, maxLength, fillString);

    // then
    expect(formatted).toBe('24');
  });

  it('지정한 자릿수 이내라면 한 글자 이상의 문자열로도 자릿수를 채울 수 있어야 한다.', () => {
    // given
    const number = 4;
    const maxLength = 4;
    const fillString = '123';

    // when
    const formatted = formatDigits(number, maxLength, fillString);

    // then
    expect(formatted).toBe('1234');
  });

  it('변환할 값에 음수를 입력하면 에러가 발생해야 한다.', () => {
    // given
    const number = -1;
    const maxLength = 2;

    // when
    // then
    expect(() => formatDigits(number, maxLength)).toThrow();
  });

  it('변환할 값이 Number.MAX_SAFE_INTEGER 보다 크다면 에러가 발생해야 한다.', () => {
    // given
    const number = Number.MAX_SAFE_INTEGER + 1;
    const maxLength = 2;

    // when
    // then
    expect(() => formatDigits(number, maxLength)).toThrow();
  });

  it('변환할 자릿수에 음수를 입력하면 에러가 발생해야 한다.', () => {
    // given
    const number = 4;
    const maxLength = -1;

    // when
    // then
    expect(() => formatDigits(number, maxLength)).toThrow();
  });

  it('변환할 자릿수가 Number.MAX_SAFE_INTEGER 보다 크다면 에러가 발생해야 한다.', () => {
    // given
    const number = 4;
    const maxLength = Number.MAX_SAFE_INTEGER + 1;

    // when
    // then
    expect(() => formatDigits(number, maxLength)).toThrow();
  });

  it('채울 문자열이 한 글자 이상이라면 에러가 발생해야 한다.', () => {
    // given
    const number = 4;
    const maxLength = 2;
    const fillString = '29';

    // when
    // then
    expect(() => formatDigits(number, maxLength, fillString)).toThrow();
  });
});

describe('Format phone number', () => {
  it('should retrn empty string with no value', () => {
    expect(formatPhoneNumber('')).toBe('');
  });

  it('should return value as it is if length of value is less than 4', () => {
    expect(formatPhoneNumber('012')).toBe('012');
    expect(formatPhoneNumber('456')).toBe('456');
    expect(formatPhoneNumber('789')).toBe('789');
  });

  it('should format value if length of value is 4 or more', () => {
    expect(formatPhoneNumber('0123')).toBe('012-3');
    expect(formatPhoneNumber('012345')).toBe('012-345');
    expect(formatPhoneNumber('01234567')).toBe('012-3456-7');
    expect(formatPhoneNumber('01234567891')).toBe('012-3456-7891');
  });

  it('should return number only 11 digits if value is exceeding 11 digits', () => {
    expect(formatPhoneNumber('01234567891011')).toBe('012-3456-7891');
    expect(formatPhoneNumber('01234567891011121314')).toBe('012-3456-7891');
  });

  it('should return empty string when value is not number', () => {
    expect(formatPhoneNumber('asd')).toBe('');
    expect(formatPhoneNumber('asddsakfkadsfj')).toBe('');
    expect(formatPhoneNumber('ㄱㄷㅁㄷㄹㄷ')).toBe('');
  });

  it('should format value only when value is combined string', () => {
    expect(formatPhoneNumber('asd123')).toBe('123');
    expect(formatPhoneNumber('123asd')).toBe('123');
    expect(formatPhoneNumber('asd123asd')).toBe('123');
    expect(formatPhoneNumber('123asd456')).toBe('123-456');
  });
});
