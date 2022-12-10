const TIME_UNIT = Object.freeze({
  second: 60,
  minute: 60,
  hour: 24,
});

const TIME = Object.freeze({
  minute: 60,
  hour: 60 * 60,
  day: 24 * 60 * 60,
});

export const convertNumberToTime = (time: number) => {
  if (time < 0) {
    throw new RangeError('0보다 작은 수는 시간으로 환산할 수 없습니다.');
  }

  if (time > Number.MAX_SAFE_INTEGER) {
    throw new RangeError('시간으로 환산할 수 있는 범위를 벗어났습니다.');
  }

  const days = Math.floor(time / TIME.day);
  const hours = Math.floor((time / TIME.hour) % TIME_UNIT.hour);
  const minutes = Math.floor((time / TIME_UNIT.minute) % TIME_UNIT.minute);
  const seconds = Math.floor((time % TIME_UNIT.second) % TIME_UNIT.second);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const formatDigits = (
  number: number,
  maxLength: number,
  fillString = '0',
) => {
  if (number > Number.MAX_SAFE_INTEGER || number < 0) {
    throw new RangeError(
      `변환할 수 있는 수의 범위를 벗어났습니다. (min: 0, max: ${Number.MAX_SAFE_INTEGER})`,
    );
  }

  if (maxLength > Number.MAX_SAFE_INTEGER || maxLength < 0) {
    throw new RangeError(
      `변환할 수 자릿수의 범위를 벗어났습니다. (min: 0, max: ${Number.MAX_SAFE_INTEGER})`,
    );
  }

  if (fillString.length > maxLength - 1) {
    throw new RangeError('채우려는 문자열의 길이가 지정한 길이를 초과합니다.');
  }

  return String(number).padStart(maxLength, fillString);
};

export const formatPhoneNumber = (value: string): string => {
  if (!value) return '';
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) {
    return phoneNumber;
  }

  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }

  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`; // prettier-ignore
};
