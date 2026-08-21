import { BigNumber } from 'ethers';
import { Zero } from '@ethersproject/constants';
import { ETHER } from 'config';

type TValue = BigNumber | null | undefined;

export const calculateTokensRatio = (value1: TValue, value2: TValue) => {
  if (value1 && value2) {
    return value1.mul(value2).div(ETHER);
  }

  return Zero;
};
