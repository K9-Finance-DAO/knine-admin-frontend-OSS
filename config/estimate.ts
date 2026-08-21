import { parseEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';
// account for gas estimation
// will always have >=10000 bone, >=10000 knBone
// on Mainnet, Sepolia
export const ESTIMATE_ACCOUNT = '0xdF2c5b7d9bc9D9Ee4C106BA413738FdF93CA43Ba';
export const ESTIMATE_AMOUNT = parseEther('10000');

// fallback gas limits per 1 withdraw request
export const WITHDRAWAL_QUEUE_REQUEST_STETH_PERMIT_GAS_LIMIT_DEFAULT =
  BigNumber.from(255350);
export const WITHDRAWAL_QUEUE_REQUEST_WSTETH_PERMIT_GAS_LIMIT_DEFAULT =
  BigNumber.from(312626);

export const WITHDRAWAL_QUEUE_REQUEST_STETH_APPROVED_GAS_LIMIT_DEFAULT =
  BigNumber.from(228163);
export const WITHDRAWAL_QUEUE_REQUEST_WSTETH_APPROVED_GAS_LIMIT_DEFAULT =
  BigNumber.from(280096);

export const WITHDRAWAL_QUEUE_CLAIM_GAS_LIMIT_DEFAULT = BigNumber.from(89818);
