import { useCallback, useState } from 'react';
import { useInterval } from './useInterval';

export const MILLISECOND = 1;
export const SECOND = 1000 * MILLISECOND;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

const timeDifferenceToDHMS = (timeDifference: number) => {
  if (timeDifference > 0) {
    return {
      days: Math.floor(timeDifference / DAY),
      hours: Math.floor(timeDifference / HOUR) % 24,
      minutes: Math.floor((timeDifference / MINUTE) % 60),
      seconds: Math.floor((timeDifference / SECOND) % 60),
    };
  }

  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
};

export type TimeLeft = ReturnType<typeof timeDifferenceToDHMS>;

type CountdownOptions = {
  endTime: number;
  startTime?: number;
  intervalMs?: number;
  shouldCount?: boolean;
  autoStart?: boolean;
  onComplete?: () => void;
};

type CountdownManager = {
  timeLeft: TimeLeft;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isFinished: boolean;
};
/**
 * Calculates time left from endTime to now (start time)
 */
export const useCountdown = ({
  startTime = Date.now(),
  endTime,
  intervalMs = SECOND,
  autoStart = false,
  onComplete,
}: CountdownOptions): CountdownManager => {
  const initialTimeDifference = endTime - startTime;

  const [isActive, setIsActive] = useState<boolean>(autoStart);
  const [timeLeft, setTimeLeft] = useState(initialTimeDifference);

  const decrementTime = useCallback(
    () => setTimeLeft((prev) => prev - intervalMs),
    [intervalMs],
  );

  const start = useCallback(() => setIsActive(true), []);
  const stop = useCallback(() => {
    setIsActive(false);
    onComplete?.();
  }, [onComplete]);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(initialTimeDifference);
  }, [initialTimeDifference, stop]);

  const countdown = useCallback(() => {
    if (timeLeft <= 0) {
      stop();
      return;
    }

    decrementTime();
  }, [timeLeft, decrementTime, stop]);

  useInterval(countdown, isActive ? intervalMs : null);

  return {
    timeLeft: timeDifferenceToDHMS(timeLeft),
    start,
    stop,
    reset,
    isFinished: !isActive && timeLeft <= 0,
  };
};
