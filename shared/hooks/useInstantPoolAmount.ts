import { getTokenAddress, TOKENS } from '@knine-sdk/constants';
import {
  useContractSWR,
  useKnBoneContractRPC,
  useSDK,
  useTokenBalance,
} from '@knine-sdk/react';
import { STRATEGY_IMMUTABLE, STRATEGY_LAZY } from 'utils';
import { useChainId } from './useChainId';

export const useInstantPoolAmount = () => {
  const { findProviderByChainId } = useSDK();
  const { chainId } = useChainId();

  const { data: instantPoolAddress } = useContractSWR({
    contract: useKnBoneContractRPC(chainId),
    method: 'instantPool',
    config: STRATEGY_IMMUTABLE,
  });

  const {
    data,
    initialLoading: isPoolAmountBoneLoading,
    update: updatePoolAmountBone,
    loading,
  } = useTokenBalance(
    getTokenAddress(chainId, TOKENS.BONE),
    instantPoolAddress,
    STRATEGY_LAZY,
    findProviderByChainId(chainId)?.provider,
  );

  return {
    amount: data,
    get loading() {
      return isPoolAmountBoneLoading || loading;
    },
    update(this: void) {
      return Promise.all([updatePoolAmountBone()]);
    },
  };
};
