import { formatPhoneNumber } from '~utils/format-utils';

describe('Format util function test', () => {
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
});
