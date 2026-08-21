import { BigNumber } from 'ethers';
import { FormatToken } from 'shared/formatters';

type TxAmountProps = {
  amount: BigNumber | number;
  symbol: string;
  decimals?: number;
  maxDecimalDigits?: number;
  trimEllipsis?: boolean;
};

export const TxAmount = ({
  amount,
  symbol,
  decimals,
  maxDecimalDigits,
  trimEllipsis = true,
}: TxAmountProps) =>
  typeof amount === 'number' ? (
    <>
      {amount}&nbsp;{symbol}
    </>
  ) : (
    <FormatToken
      amount={amount}
      symbol={symbol}
      decimals={decimals}
      maxTotalLength={Infinity}
      adaptiveDecimals
      trimEllipsis={trimEllipsis}
      maxDecimalDigits={maxDecimalDigits}
    />
  );
