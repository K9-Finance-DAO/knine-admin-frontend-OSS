import { FormatBalanceArgs, useFormattedBalance } from 'utils';
import { BigNumber } from '@ethersproject/bignumber';
import { DATA_UNAVAILABLE } from 'config';
import { Typography, TypographyProps, Tooltip } from '@mui/material';
import { FC } from 'react';

export type FormatTokenProps = FormatBalanceArgs & {
  symbol: string;
  decimals?: number;
  amount?: BigNumber;
  approx?: boolean;
  showAmountTip?: boolean;
  fallback?: string;
  wrap?: boolean;
  symbolTooltipOnly?: boolean;
};

export interface FormatTokenComponentProps
  extends TypographyProps,
    FormatTokenProps {}

export const FormatToken: FC<FormatTokenComponentProps> = ({
  amount,
  decimals,
  symbol,
  approx,
  maxDecimalDigits = 4,
  maxTotalLength = 15,
  showAmountTip = true,
  trimEllipsis,
  fallback = DATA_UNAVAILABLE,
  adaptiveDecimals,
  wrap = false,
  symbolTooltipOnly = false,
  ...rest
}) => {
  const { actual, isTrimmed, trimmed } = useFormattedBalance(amount, {
    maxDecimalDigits,
    maxTotalLength,
    trimEllipsis,
    adaptiveDecimals,
    decimals,
  });

  if (!amount) {
    return (
      <Typography component="span" variant="inherit" {...rest}>
        {fallback}
      </Typography>
    );
  }
  const showTooltip = showAmountTip || isTrimmed;
  const bodySpace = wrap ? (
    <>
      <wbr />{' '}
    </>
  ) : (
    '\u00A0'
  );
  // we show prefix for non zero amount and if we need to show Tooltip Amount
  // overridden by explicitly set approx
  const prefix = amount && !amount.isZero() && approx ? '~ ' : '';

  const body = (
    <Typography component="span" variant="inherit" {...rest}>
      {prefix}
      {trimmed}
      {bodySpace}
      {!symbolTooltipOnly && symbol}
    </Typography>
  );

  if (showTooltip) {
    return (
      <Tooltip
        placement="bottom-start"
        title={
          <span>
            {actual}&nbsp;{symbol}
          </span>
        }
      >
        {body}
      </Tooltip>
    );
  }

  return body;
};
