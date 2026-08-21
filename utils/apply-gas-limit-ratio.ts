import { BigNumber } from 'ethers';
import { PRECISION, SUBMIT_EXTRA_GAS_TRANSACTION_RATIO } from '../config';

export const applyGasLimitRatio = (gasLimit: BigNumber): BigNumber =>
  gasLimit.mul(SUBMIT_EXTRA_GAS_TRANSACTION_RATIO * PRECISION).div(PRECISION);
