import { useCallback } from 'react';
import { useSDK } from '@knine-sdk/react';

import { useClientConfig } from 'providers/client-config';
import { CHAINS_IDS } from 'utils/chains';
import { CHAINS, CHAINS as SDK_CHAINS } from '@knine-sdk/constants';

export const getBackendRPCPath = (chainId: string | number): string => {
  const BASE_URL = typeof window === 'undefined' ? '' : window.location.origin;
  return `${BASE_URL}/api/rpc?chainId=${chainId}`;
};

export const useGetRpcUrlByChainId = () => {
  const clientConfig = useClientConfig();

  return useCallback(
    (chainId: CHAINS_IDS | SDK_CHAINS) => {
      // This condition is needed because in 'providers/web3.tsx' we add `wagmiChains.polygonMumbai` to supportedChains as a workaround.
      // polygonMumbai (80001) may cause an invariant throwing.
      // And we always need Mainnet RPC for some requests, e.g. ETH to USD price, ENS lookup.
      if (
        chainId !== CHAINS_IDS.Mainnet &&
        !clientConfig.supportedChainIds.includes(chainId)
      ) {
        // Has no effect on functionality. Just a fix.
        // Return empty string as a stub
        // (see: 'providers/web3.tsx' --> jsonRpcBatchProvider --> getStaticRpcBatchProvider)
        return '';
      }

      return (
        clientConfig.savedClientConfig.rpcUrls[chainId] ||
        getBackendRPCPath(chainId)
      );
    },
    [clientConfig],
  );
};

export const useRpcUrl = (chainId?: CHAINS) => {
  const { chainId: currentChainId } = useSDK();
  const getRpcUrlByChainId = useGetRpcUrlByChainId();
  return getRpcUrlByChainId(chainId ?? (currentChainId as number));
};
