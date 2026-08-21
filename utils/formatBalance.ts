import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { Zero } from '@ethersproject/constants';
import { useMemo } from 'react';

export type FormatBalanceArgs = {
  maxDecimalDigits?: number;
  adaptiveDecimals?: boolean;
  maxTotalLength?: number;
  trimEllipsis?: boolean;
  decimals?: number;
};

export const formatBalance = (
  balance: BigNumber = Zero,
  {
    maxDecimalDigits = 4,
    maxTotalLength,
    adaptiveDecimals,
    trimEllipsis,
    decimals,
  }: FormatBalanceArgs = {},
) => {
  const actual = formatUnits(balance, decimals);
  let trimmed = actual;
  let isTrimmed = false;

  if (actual.includes('.')) {
    const parts = actual.split('.');
    const integer = parts[0];
    let decimal = parts[1];

    // format zero amount to '0.00'
    if (integer === '0' && decimal === '0') {
      decimal = '00';
    }

    if (maxDecimalDigits > 0) {
      if (adaptiveDecimals) {
        const nonZeroIdx = decimal.split('').findIndex((v) => v !== '0');
        const sliceAt = Math.max(maxDecimalDigits, nonZeroIdx + 1);
        decimal = decimal.slice(0, sliceAt);
      } else {
        decimal = decimal.slice(0, maxDecimalDigits);
      }

      trimmed = `${integer}.${decimal}`;
      // trim balance only when balance is lower then 1
      if (decimal.length < parts[1].length && integer === '0') {
        isTrimmed = true;
        if (trimEllipsis) trimmed += '...';
      }
    } else {
      trimmed = integer;
    }
  }

  if (maxTotalLength && trimmed.length > maxTotalLength - 3) {
    if (trimmed[maxTotalLength - 4] === '.') {
      trimmed = trimmed.slice(0, maxTotalLength - 4);
    } else {
      isTrimmed = true;
      trimmed = trimmed.slice(0, maxTotalLength - 3) + '...';
    }
  }

  return {
    actual,
    trimmed,
    isTrimmed,
  };
};

export const useFormattedBalance: typeof formatBalance = (
  balance = Zero,
  {
    maxDecimalDigits = 4,
    maxTotalLength,
    adaptiveDecimals,
    trimEllipsis,
    decimals,
  } = {},
) => {
  return useMemo(
    () =>
      formatBalance(balance, {
        maxDecimalDigits,
        maxTotalLength,
        adaptiveDecimals,
        trimEllipsis,
        decimals,
      }),
    [
      balance,
      maxDecimalDigits,
      maxTotalLength,
      adaptiveDecimals,
      trimEllipsis,
      decimals,
    ],
  );
};
