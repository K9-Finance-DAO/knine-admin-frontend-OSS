import {
  formatWEI,
  formatETH,
  formatStEthEth,
  formatCurrency,
  formatPercentage,
} from 'features/liquid-staking/rewards/utils/numberFormatting';
import { InlineLoader } from '@lidofinance/lido-ui';
import { Tooltip } from '@mui/material';
import type { BigNumber } from 'features/liquid-staking/rewards/helpers';
import { Big, BigDecimal } from 'features/liquid-staking/rewards/helpers';
import { DEFAULT_FALLBACK } from 'config';

type FormatArgs = {
  number?: string | number | BigNumber | undefined;
  StEthEth?: boolean;
  currency?: boolean;
  percent?: boolean;
  ETH?: boolean;
};

// Using ETH as a default formatter
const format = (
  { number, StEthEth, currency, percent, ETH }: FormatArgs,
  manyDigits?: boolean,
): string => {
  if (number === undefined) return '';

  const args = [new BigDecimal(number), Boolean(manyDigits)] as const;

  if (StEthEth) {
    return formatStEthEth(...args);
  } else if (currency) {
    return formatCurrency(...args);
  } else if (percent) {
    return formatPercentage(...args);
  } else if (ETH) {
    return formatETH(...args);
  } else {
    return formatWEI(new Big(number), args[1]);
  }
};

type Props = Partial<FormatArgs> & {
  id?: string;
  pending?: boolean;
  fallback?: string;
};

export const NumberFormat = ({
  fallback = DEFAULT_FALLBACK,
  ...props
}: Props) => {
  if (props.pending)
    return <InlineLoader style={{ flexBasis: '50%', minWidth: '60px' }} />;

  return props.number ? (
    <Tooltip
      placement="bottom"
      title={<span id={props.id}>{format(props, true)}</span>}
    >
      <span id={props.id}>{format(props)}</span>
    </Tooltip>
  ) : (
    <>{fallback}</>
  );
};
