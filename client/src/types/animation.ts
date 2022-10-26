export interface AnimationOption {
  name: string;
  duration: number;
  timingFunction: string;
  fillMode: string;
  delay: number;
  iterationCount: number | string;
  direction: string;
  playState: string;
}

export interface SlideInAnimation extends Partial<AnimationOption> {
  translateValue: number;
}

export interface UnderlineAnimation {
  color: string;
  highlight?: string;
  height?: number;
  bottom?: number;
}
