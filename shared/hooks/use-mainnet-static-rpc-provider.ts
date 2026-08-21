import { useMemo } from 'react';
import { StaticJsonRpcBatchProvider } from '@lidofinance/eth-providers';

import { useGetRpcUrlByChainId } from 'config';
import { CHAINS_IDS, getStaticRpcBatchProvider } from 'utils';

export const useMainnetStaticRpcProvider = (): StaticJsonRpcBatchProvider => {
  const getRpcUrl = useGetRpcUrlByChainId();
  return useMemo(() => {
    return getStaticRpcBatchProvider(1, getRpcUrl(CHAINS_IDS.Mainnet));
  }, [getRpcUrl]);
};
