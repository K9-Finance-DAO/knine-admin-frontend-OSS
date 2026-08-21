import BigNumber from 'bignumber.js';

import { formatNumber } from './numberFormatter';

export const toDecimals = (
  balance: string | number,
  decimals = 18,
  shouldForamatNumber = false,
): string => {
  if (balance === '') {
    return '0';
  }

  if (typeof balance === 'number') {
    balance.toString();
  }

  const displayValue = new BigNumber(balance).multipliedBy(
    new BigNumber(10).pow(decimals),
  );

  if (shouldForamatNumber) {
    const formattedValue = formatNumber(+displayValue.toString());

    return formattedValue;
  }

  return displayValue.toString(10);
};

export const fromDecimals = (
  balance: string | number,
  decimals = 18,
  maximumFractions = 4,
): string => {
  if (balance === '') {
    return '0';
  }

  if (typeof balance === 'number') {
    balance.toString();
  }

  const displayValue = new BigNumber(balance).dividedBy(
    new BigNumber(10).pow(decimals),
  );

  return parseFloat(
    displayValue.decimalPlaces(maximumFractions).toString(),
  ).toString();
};
