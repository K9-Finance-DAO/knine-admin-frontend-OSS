import { useKnBoneBalance, useSDK, useTokenBalance } from '@knine-sdk/react';
import { STRATEGY_CONSTANT } from 'utils/swrStrategies';
import { Zero } from '@ethersproject/constants';
import { SWRConfiguration } from 'swr';
import { getTokenAddress, TOKENS } from '@knine-sdk/constants';
import { useMemo } from 'react';
import { useChainId } from 'shared/hooks';

export const useFetchKnBoneBalance = (config?: SWRConfiguration) => {
  const { chainId, defaultChain } = useChainId();

  const { account, findProviderByChainId } = useSDK(); // on liquid staking there eth/sepolia is the main chain

  const {
    data: knBoneBalanceShib,
    update: updateKnBoneShibariumBalance,
    initialLoading: isKnBoneShibariumBalanceLoading,
    error: shibError,
  } = useTokenBalance(
    getTokenAddress(defaultChain, TOKENS.KNBONE),
    account,
    config || STRATEGY_CONSTANT,
    findProviderByChainId(defaultChain)?.provider,
  );
  const {
    data: knBoneBalanceEth,
    update: updateKnBoneEthBalance,
    initialLoading: isKnBoneEthBalanceLoading,
    error: ethError,
  } = useKnBoneBalance(config || STRATEGY_CONSTANT, {
    chainId,
  });

  const totalBalanceValue = useMemo(
    () => (knBoneBalanceShib ?? Zero)?.add(knBoneBalanceEth ?? Zero),
    [knBoneBalanceEth, knBoneBalanceShib],
  );
  return {
    knBoneBalanceShib,
    knBoneBalanceEth,

    get totalBalance() {
      return totalBalanceValue;
    },
    get initialLoading() {
      return isKnBoneShibariumBalanceLoading || isKnBoneEthBalanceLoading;
    },
    update(this: void) {
      return Promise.allSettled([
        updateKnBoneEthBalance,
        updateKnBoneShibariumBalance,
      ]);
    },
    get error() {
      return ethError || shibError;
    },
  };
};
