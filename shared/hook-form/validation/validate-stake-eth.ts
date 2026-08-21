import { validateBignumberMax } from './validate-bignumber-max';
import { formatEther } from '@ethersproject/units';
import { Zero } from '@ethersproject/constants';

import type { BigNumber } from 'ethers';
import {
  getTokenDisplayName,
  TOKEN_DISPLAY_NAMES,
} from 'utils/getTokenDisplayName';
import { TOKENS } from '@knine-sdk/constants';

export type validateStakeEthParams = {
  formField: string;
  amount: BigNumber;
  isWalletActive: boolean;
  gasCost: BigNumber;
  boneBalance: BigNumber;
  isMultisig: boolean;
  token?: keyof typeof TOKEN_DISPLAY_NAMES;
  nativeToken?: keyof typeof TOKEN_DISPLAY_NAMES;
};

// Runs validation pipeline common between stake and wrapEth
export const validateStakeEth = ({
  isWalletActive,
  amount,
  formField,
  boneBalance,
  gasCost,
  isMultisig,
  token = TOKENS.BONE,
  nativeToken = 'ETH',
}: validateStakeEthParams) => {
  if (isWalletActive) {
    validateBignumberMax(
      formField,
      amount,
      boneBalance,
      `Entered ${getTokenDisplayName(token)} amount exceeds your available balance of ${formatEther(
        boneBalance,
      )}`,
    );

    if (!isMultisig) {
      const gasPaddedBalance = boneBalance.sub(gasCost);
      validateBignumberMax(
        formField,
        Zero,
        gasPaddedBalance,
        `Ensure you have sufficient ${nativeToken} to cover the gas cost of ${formatEther(
          gasCost,
        )}`,
      );

      validateBignumberMax(
        formField,
        amount,
        gasPaddedBalance,
        `Enter ${getTokenDisplayName(token)} amount less than ${formatEther(
          gasPaddedBalance,
        )} to ensure you leave enough ${nativeToken} for gas fees`,
      );
    }
  }
};
