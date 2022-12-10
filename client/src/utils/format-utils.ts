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
