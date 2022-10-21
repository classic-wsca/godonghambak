import { pixelToRem, createBreakPoint } from '~utils/style-utils';

describe('Style util tests', () => {
  describe('Pixel to rem', () => {
    it('should be possible to change to rem when the piexel is integer', () => {
      expect(pixelToRem(16)).toBe('1rem');
      expect(pixelToRem(32)).toBe('2rem');
      expect(pixelToRem(48)).toBe('3rem');
    });

    it('should be possible to change to rem when the pixel is float', () => {
      expect(pixelToRem(1.6)).toBe('0.1rem');
      expect(pixelToRem(3.2)).toBe('0.2rem');
      expect(pixelToRem(4.8)).toBe('0.3rem');
    });

    it('should throw an error if pixel is negative number', () => {
      expect(pixelToRem(-16)).toBe('-1rem');
      expect(pixelToRem(-1.6)).toBe('-0.1rem');
    });
  });

  describe('Create breakpoint', () => {
    it('should be able to return string with breakpoints', () => {
      expect(createBreakPoint(2)).toBe(`screen and (max-width: 2rem)`);
      expect(createBreakPoint(20)).toBe(`screen and (max-width: 20rem)`);
    });

    it('should be able to return string with float number breakpoints', () => {
      expect(createBreakPoint(2.5)).toBe(`screen and (max-width: 2.5rem)`);
      expect(createBreakPoint(8.5)).toBe(`screen and (max-width: 8.5rem)`);
    });

    it('should throw an error if pixel is negative number', () => {
      expect(() => createBreakPoint(-16)).toThrow(
        '화면 사이즈는 0보다 커야 합니다.',
      );
      expect(() => createBreakPoint(-1.6)).toThrow(
        '화면 사이즈는 0보다 커야 합니다.',
      );
    });
  });
});
