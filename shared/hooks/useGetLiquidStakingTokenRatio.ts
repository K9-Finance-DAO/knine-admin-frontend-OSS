import { BigNumber } from 'ethers';
import { useContractSWR, useKnBoneContractRPC } from '@knine-sdk/react';
import { STRATEGY_LAZY } from 'utils/swrStrategies';
import { ETHER } from 'config';
import { useCallback } from 'react';
import { calculateTokensRatio, modifyValueByPercent } from 'utils';
import { useChainId } from 'shared/hooks';

export const useGetLiquidStakingTokenRatio = (
  amount: BigNumber | undefined,
  boneToKnBone: boolean,
) => {
  const { chainId } = useChainId();

  const method = boneToKnBone ? 'convertBONEToKnBONE' : 'convertKnBONEToBONE';

  const result = useContractSWR({
    contract: useKnBoneContractRPC(chainId),
    method: method,
    params: [amount],
    shouldFetch: !!amount,
    config: STRATEGY_LAZY,
  });

  return {
    ...result,
    data: result.data?.[0],
  };
};

export const useAmountByTokenRatio = (isBoneToKnBone = false) => {
  const {
    data: ratio,
    initialLoading,
    loading,
  } = useGetLiquidStakingTokenRatio(ETHER, isBoneToKnBone);

  return {
    ratioLoading: initialLoading || loading,
    calculateAmount: useCallback(
      (amount: BigNumber, additionalFee?: BigNumber, isIncrease = false) => {
        const value = additionalFee
          ? modifyValueByPercent(amount, additionalFee, isIncrease)
          : amount;

        return calculateTokensRatio(ratio, value);
      },
      [ratio],
    ),
  };
};
