/**
 * 최솟값 포함, 최댓값은 제외인 random number를 반환
 * @param min number
 * @param max number
 * @returns number
 */
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};
