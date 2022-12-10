import type { TimerConfig } from '~types/timer';

import { renderHook, act } from '@testing-library/react';

import { useTimer } from '~hooks/index';

describe('useTimer 훅 테스트', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('start', () => {
    it('타이머를 시작할 수 있어야 한다.', () => {
      // given
      const { result } = renderHook(() => useTimer());

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(5000));

      // then
      expect(result.current.time).toBe(5);
    });

    it('일시 정지 상태로 타이머를 시작할 수 있어야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        initialStatus: 'PAUSED',
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => jest.advanceTimersByTime(5000));

      // then
      expect(result.current.time).toBe(0);
      expect(result.current.status).toBe('PAUSED');
    });

    it('초기 상태가 "RUNNING"이라면 타이머를 자동 시작해야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        initialStatus: 'RUNNING',
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => jest.advanceTimersByTime(20000));

      // then
      expect(result.current.time).toBe(20);
    });

    it('타이머의 초기 시작 시간을 변경할 수 있어야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        initialTime: 10,
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(5000));

      // then
      expect(result.current.time).toBe(15);
    });

    it('초기 시간이 변경되면 타이머가 재시작해야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        initialTime: 10,
      };
      const { result, rerender } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());
      initialState.initialTime = 20;
      rerender();

      // when
      act(() => result.current.reset());
      act(() => result.current.start());

      // then
      expect(result.current.time).toBe(20);
    });

    it('타이머를 시간이 줄어드는 방식으로도 시작할 수 있어야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        initialTime: 100,
        timerType: 'DECREMENTAL',
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(20000));

      // then
      expect(result.current.time).toBe(80);
    });

    it('타이머의 업데이트 간격을 변경할 수 있어야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        interval: 2000,
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(10000));

      // then
      expect(result.current.time).toBe(5);
    });

    it('타이머를 자동 시작할 수 있어야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        autostart: true,
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => jest.advanceTimersByTime(20000));

      // then
      expect(result.current.time).toBe(20);
    });
  });

  describe('stop', () => {
    it('시간이 증가하는 타이머일 때, 지정한 마지막 시간이 되면 타이머가 멈춰야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        endTime: 25,
        initialTime: 5,
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());

      for (let i = 0; i < 40; i += 1) {
        act(() => jest.advanceTimersByTime(1000));
      }

      // then
      expect(result.current.time).toBe(25);
    });

    it('시간이 감소하는 타이머일 때, 지정한 마지막 시간이되면 타이머가 멈춰야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        endTime: 10,
        initialTime: 30,
        timerType: 'DECREMENTAL',
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());

      for (let i = 0; i < 30; i += 1) {
        act(() => jest.advanceTimersByTime(1000));
      }

      // then
      expect(result.current.time).toBe(10);
    });
  });

  describe('pause', () => {
    it('타이머를 일시정지 할 수 있어야 한다.', () => {
      // given
      const { result } = renderHook(() => useTimer());

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(5000));

      // when
      act(() => result.current.pause());
      act(() => jest.advanceTimersByTime(5000));

      // then
      expect(result.current.time).toBe(5);
    });

    it('종료 시간 설정 시에도 타이머를 일시정지 할 수 있어야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = { endTime: 5 };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(3000));

      // when
      act(() => result.current.pause());
      act(() => jest.advanceTimersByTime(5000));

      // when
      act(() => result.current.start());

      // then
      expect(result.current.time).toBe(3);

      // when
      for (let i = 1; i < 3; i += 1) {
        act(() => jest.advanceTimersByTime(1000));
      }

      // then
      expect(result.current.time).toBe(5);
    });
  });

  describe('reset', () => {
    it('타이머를 초기에 입력받은 시간으로 초기화 할 수 있어야 한다.', () => {
      // given
      const { result } = renderHook(() => useTimer());

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(5000));

      // when
      act(() => result.current.reset());

      // then
      expect(result.current.time).toBe(0);
    });

    it('타이머를 재시작하면 초기에 입력받은 시간으로 초기화 할 수 있어야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = { endTime: 10 };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(10000));

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(5000));

      // then
      expect(result.current.time).toBe(5);
    });

    it('타이머를 0이 아닌 초기에 입력받은 시간으로도 초기화 할 수 있어야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = { initialTime: 20 };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(5000));

      // when
      act(() => result.current.reset());

      // then
      expect(result.current.time).toBe(20);
    });
  });

  describe('advance time', () => {
    it('입력한 시간만큼 시간을 뒤로 조절할 수 있어야 한다.', () => {
      // given
      const { result } = renderHook(() => useTimer());

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(5000));

      // when
      act(() => result.current.advanceTime(10));

      // then
      expect(result.current.time).toBe(15);
    });

    it('입력한 시간만큼 시간을 앞으로 조절할 수 있어야 한다.', () => {
      // given
      const initialState: Partial<TimerConfig> = {
        initialTime: 30,
        timerType: 'DECREMENTAL',
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(10000));

      // when
      act(() => result.current.advanceTime(5));

      // then
      expect(result.current.time).toBe(15);
    });

    it('입력한 시간만큼 시간을 조절한 후에 타이머가 진행될 수 있어야 한다.', () => {
      // given
      const { result } = renderHook(() => useTimer());

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(10000));

      // when
      act(() => result.current.advanceTime(50));
      act(() => jest.advanceTimersByTime(20000));

      // then
      expect(result.current.time).toBe(80);
    });
  });

  describe('state and callback', () => {
    it('시간이 진행되거나 멈춤에 따라 타이머의 상태가 변경되어야 한다.', () => {
      // given
      const { result } = renderHook(() => useTimer());

      // when
      act(() => result.current.start());

      // then
      expect(result.current.status).toBe('RUNNING');

      // when
      act(() => result.current.pause());

      // then
      expect(result.current.status).toBe('PAUSED');

      // when
      act(() => result.current.start());

      // then
      expect(result.current.status).toBe('RUNNING');

      // when
      act(() => result.current.reset());

      // then
      expect(result.current.status).toBe('STOPPED');
    });

    it('타이머가 종료된 후에 콜백 함수를 호출할 수 있어야 한다.', () => {
      // given
      const onTimeOver = jest.fn();
      const initialState: Partial<TimerConfig> = {
        endTime: 30,
        initialTime: 0,
        onTimeOver,
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(30000));

      // then
      expect(onTimeOver).toHaveBeenCalled();
    });

    it('시간이 갈 때마다 콜백 함수를 호출할 수 있어야 한다.', () => {
      // given
      const onTimeUpdate = jest.fn();
      const initialState: Partial<TimerConfig> = {
        endTime: 10,
        initialTime: 0,
        onTimeUpdate,
      };
      const { result } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());

      for (let i = 0; i < 10; i += 1) {
        act(() => jest.advanceTimersByTime(1000));
      }

      // then
      expect(onTimeUpdate).toHaveBeenCalledTimes(11);
      expect(onTimeUpdate).toHaveBeenNthCalledWith(5, 4);
      expect(onTimeUpdate).toHaveBeenLastCalledWith(10);
    });

    it('시간이 갈 때마다 업데이트된 콜백 함수를 호출할 수 있어야 한다.', () => {
      // given
      const initialOnTimeUpdate = jest.fn();
      const updatedOnTimeUpdate = jest.fn();
      const initialState: Partial<TimerConfig> = {
        endTime: 10,
        initialTime: 0,
        onTimeUpdate: initialOnTimeUpdate,
      };
      const { result, rerender } = renderHook(() => useTimer(initialState));

      // when
      act(() => result.current.start());

      initialState.onTimeUpdate = updatedOnTimeUpdate;
      rerender({ ...initialState, onTimeUpdate: updatedOnTimeUpdate });

      for (let i = 0; i < 10; i += 1) {
        act(() => jest.advanceTimersByTime(1000));
      }

      // then
      expect(initialOnTimeUpdate).toHaveBeenCalledTimes(1);
      expect(updatedOnTimeUpdate).toHaveBeenCalledTimes(11);
    });
  });
});
