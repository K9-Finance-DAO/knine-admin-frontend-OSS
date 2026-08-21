import { BigNumber } from 'ethers';

export const formatNumber = (number: number | string) =>
  new Intl.NumberFormat().format(+number);

export const formatCurrency = (
  amount: number | string,
  locale = 'en-US',
  currency = 'usd',
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(+amount);

export const formatWithDots = (
  value: string | number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  return numericValue.toLocaleString('en-GB', {
    minimumFractionDigits,
    maximumFractionDigits,
  });
};

export const modifyValueByPercent = (
  value: BigNumber,
  percent: BigNumber,
  isIncrease: boolean,
) => {
  const changeAmount = value.mul(percent).div(100);
  return isIncrease ? value.add(changeAmount) : value.sub(changeAmount);
};
