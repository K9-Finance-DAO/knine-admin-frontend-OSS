import { chainRelations, CHAINS } from '@knine-sdk/constants';
import { useSDK } from '@knine-sdk/react';
import { useClientConfig } from 'providers/client-config';
import { useMemo } from 'react';

// this hook is hotfix, returns the main chain on liquid staking (eth / sepolia) to be able to properly init providers and fetch data
// needs to be refactored asap
export const useChainId = (): {
  chainId: CHAINS;
  defaultChain: CHAINS;
  currentChainId: CHAINS;
} => {
  const { chainId: currentChainId } = useSDK();
  const { liquidStakingDefaultChain, defaultChain } = useClientConfig();

  return useMemo(() => {
    if (Number(currentChainId) === Number(liquidStakingDefaultChain)) {
      return { chainId: currentChainId, defaultChain, currentChainId };
    }

    return {
      chainId: chainRelations[currentChainId] as CHAINS, // workaround, reflect other chains to eth
      defaultChain,
      currentChainId,
    };
  }, [currentChainId, defaultChain, liquidStakingDefaultChain]);
};
