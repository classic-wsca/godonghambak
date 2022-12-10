export type TimerStatus = 'RUNNING' | 'PAUSED' | 'STOPPED';

export type TimerType = 'DECREMENTAL' | 'INCREMENTAL';

export type TimerReturnValue = {
  advanceTime: (timeToAdd: number) => void;
  pause: () => void;
  reset: () => void;
  start: () => void;
  status: TimerStatus;
  time: number;
};

export interface TimerConfig {
  autostart: boolean;
  endTime: number;
  initialTime: number;
  initialStatus: TimerStatus;
  interval: number;
  onTimeOver?: () => void;
  onTimeUpdate?: (time: number) => void;
  step: number;
  timerType: TimerType;
}
