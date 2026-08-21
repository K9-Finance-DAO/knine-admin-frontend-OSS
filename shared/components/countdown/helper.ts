import type { TimeLeft } from 'shared/hooks';

const padUnit = (value: number | string) => String(value).padStart(2, '0');

type Unit = keyof TimeLeft;

type Units = {
  [key in Unit]?: boolean;
};

const defaultUnits = { days: true, hours: true, minutes: true, seconds: true };
export type FormatTime = {
  isPadded?: boolean;
  separator?: string;
  units?: Units;
};

export const formatTimeLeft = (
  timeLeft: TimeLeft,
  opts?: FormatTime,
): string => {
  const {
    isPadded = false,
    separator = ' ',
    units = defaultUnits,
  } = opts ?? {};

  let timerText = '';

  for (const [unit, value] of Object.entries(timeLeft)) {
    if (units?.[unit as Unit]) {
      timerText += isPadded
        ? `${padUnit(value)}${unit[0]}${separator}`
        : `${value}${unit[0]}${separator}`;
    }
  }

  if (timerText.endsWith(separator)) {
    timerText = timerText.slice(0, -separator.length);
  }

  return timerText;
};

export const COUNTDOWN_FINISHED = 'Finished';
