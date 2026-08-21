import { Box, Tooltip } from '@mui/material';
import { fromUnixTime, lightFormat } from 'date-fns';
import { memo } from 'react';
import { MS_IN_SEC, SECONDS_IN_MINUTE } from 'config';

const getGMTFull = (dateFromUnix: Date, utc: boolean) => {
  if (utc) {
    return '+0000';
  }

  const gmtOffset = dateFromUnix.getTimezoneOffset() / 60;
  return `${gmtOffset > 0 ? '-' : '+'}${Math.abs(gmtOffset).toString().padStart(2, '0')}:00`;
};

export const DateComponent = memo(
  ({ blockTime, utc = false }: { blockTime: string; utc?: boolean }) => {
    const dateFromUnix = fromUnixTime(parseInt(blockTime));

    const parsedDate = utc
      ? new Date(
          dateFromUnix.getTime() +
            dateFromUnix.getTimezoneOffset() * SECONDS_IN_MINUTE * MS_IN_SEC,
        )
      : dateFromUnix;

    const light = lightFormat(parsedDate, 'dd.MM.yyyy');
    const full = lightFormat(parsedDate, 'dd.MM.yyyy HH:mm');
    return (
      <Tooltip
        className="tooltip"
        placement="bottom"
        title={
          <Box padding="12px!important">{`${full} GMT${getGMTFull(dateFromUnix, utc)}`}</Box>
        }
      >
        <span>{light}</span>
      </Tooltip>
    );
  },
);

DateComponent.displayName = 'DateComponent';
