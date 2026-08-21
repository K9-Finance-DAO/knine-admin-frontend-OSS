import { useCountdown } from 'shared/hooks';
import { Typography, TypographyProps } from '@mui/material';
import { FontWeights } from 'styles';
import { COUNTDOWN_FINISHED, type FormatTime, formatTimeLeft } from './helper';
import { ReactNode } from 'react';

interface CountdownProps {
  timeEnd: number;
  timeStart?: number;
  formatOpts?: FormatTime;
  completeSlot?: ReactNode;
  onComplete?: () => void;
}
export const Countdown = ({
  timeEnd,
  formatOpts,
  completeSlot,
  timeStart,
  onComplete,
  ...props
}: CountdownProps & TypographyProps) => {
  const { timeLeft, isFinished } = useCountdown({
    endTime: timeEnd,
    startTime: timeStart,
    autoStart: true,
    onComplete,
  });

  if (isFinished) {
    return (
      <>
        {completeSlot ?? (
          <Typography
            variant="body2"
            fontWeight={FontWeights.Medium}
            {...props}
          >
            {COUNTDOWN_FINISHED}
          </Typography>
        )}
      </>
    );
  }

  return (
    <Typography
      variant="body2"
      color={(theme) => theme.palette.colorScheme.light}
      fontWeight={FontWeights.Medium}
      {...props}
    >
      {formatTimeLeft(timeLeft, formatOpts)}
    </Typography>
  );
};
