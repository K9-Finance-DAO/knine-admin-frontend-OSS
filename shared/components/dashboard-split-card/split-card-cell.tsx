import { ReactNode } from 'react';
import { Stack, SxProps, Typography } from '@mui/material';
import { SlotWrapper, Stat } from './styles';

interface SplitCardCellProps {
  title: string;
  titleTextTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  statSlot: ReactNode | string;
  bottomSlot?: {
    slot: ReactNode;
    currency?: string;
    sx?: SxProps;
  };
}

export const SplitCardCell = ({
  title,
  titleTextTransform = 'uppercase',
  statSlot,
  bottomSlot,
}: SplitCardCellProps) => {
  const withCurrency = !!bottomSlot?.currency;

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      position="relative"
      paddingX={{ md: 1, lg: 0 }}
    >
      <Typography
        variant="caption"
        textTransform={titleTextTransform}
        noWrap
        className="xs gray"
        mb={0.5}
      >
        {title}
      </Typography>
      <Stat mb={1}>{statSlot}</Stat>
      {bottomSlot?.slot && (
        <SlotWrapper sx={bottomSlot.sx}>
          {withCurrency ? <span>{bottomSlot.currency}</span> : null}
          {bottomSlot.slot}
        </SlotWrapper>
      )}
    </Stack>
  );
};
