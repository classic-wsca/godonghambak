import { useState, useEffect, useCallback } from 'react';

type TimerStatus = 'RUNNING' | 'PAUSED' | 'STOPPED';
type TimerType = 'DECREMENTAL' | 'INCREMENTAL';

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

const useTimer = ({
  autostart = false,
  endTime,
  initialStatus = 'STOPPED',
  initialTime = 0,
  interval = 1000,
  onTimeOver,
  onTimeUpdate,
  step = 1,
  timerType = 'INCREMENTAL',
}: Partial<TimerConfig> = {}): TimerReturnValue => {
  const [state, setState] = useState({
    status: initialStatus,
    time: initialTime,
    timerType,
  });

  const { time, status } = state;

  const start = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      status: 'RUNNING',
      time: prevState.status === 'STOPPED' ? initialTime : prevState.time,
    }));
  }, [initialTime]);

  const pause = useCallback(() => {
    setState((prevState) => ({ ...prevState, status: 'PAUSED' }));
  }, []);

  const reset = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      status: 'STOPPED',
      time: initialTime,
    }));
  }, [initialTime]);

  const stop = useCallback(() => {
    setState((prevState) => ({ ...prevState, status: 'STOPPED' }));
  }, []);

  const advanceTime = useCallback((timeToAdd: number) => {
    setState((prevState) => ({
      ...prevState,
      time:
        prevState.timerType === 'DECREMENTAL'
          ? prevState.time - timeToAdd
          : prevState.time + timeToAdd,
    }));
  }, []);

  useEffect(() => {
    if (autostart) {
      start();
    }
  }, [autostart, start]);

  useEffect(() => {
    if (typeof onTimeUpdate === 'function') {
      onTimeUpdate(time);
    }
  }, [time, onTimeUpdate]);

  useEffect(() => {
    if (status !== 'STOPPED' && time === endTime) {
      stop();

      if (typeof onTimeOver === 'function') {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, status, stop, time]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (status === 'RUNNING') {
      intervalId = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          time:
            timerType === 'DECREMENTAL'
              ? prevState.time - step
              : prevState.time + step,
        }));
      }, interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [interval, status, step, timerType, time]);

  return { time, status, start, pause, reset, advanceTime };
};

export default useTimer;
