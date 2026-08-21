import { useState } from 'react';
import { Chip, styled, SxProps, Theme, useTheme } from '@mui/material';
import { BorderedBox, Countdown, Icons } from 'shared/components';
import { InlineLoader } from '@lidofinance/lido-ui';
import { BORDER_RADIUS_S } from 'styles';

export const FarmingCountdownWrapper = styled(BorderedBox)(({ theme }) => ({
  width: 'auto',
  minHeight: 32,
  lineHeight: '32px',
  padding: theme.spacing(0, 1),
  borderRadius: BORDER_RADIUS_S,
  background: theme.palette.colorScheme.black,
}));

type FarmingCountdownProps = {
  timeLeft: number;
  loading: boolean;
  sx?: SxProps<Theme>;
};

export const FarmingCountdown = ({
  timeLeft,
  loading,
  ...rest
}: FarmingCountdownProps) => {
  const theme = useTheme();
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return <Chip label="Completed" color="success" />;
  }

  return (
    <FarmingCountdownWrapper direction="row" alignItems="center" spacing={1}>
      <Icons.Clock fill={theme.palette.colorScheme.orangeBase} />

      {loading ? (
        <InlineLoader />
      ) : (
        <Countdown
          timeEnd={timeLeft}
          onComplete={() => setCompleted(true)}
          variant="body1"
          formatOpts={{ units: { days: true, hours: true, minutes: true } }}
          {...rest}
        />
      )}
    </FarmingCountdownWrapper>
  );
};
