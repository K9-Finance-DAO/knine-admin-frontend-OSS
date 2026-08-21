import { useMemo } from 'react';
import { useSDK } from '@knine-sdk/react';
import { CHAINS } from '@knine-sdk/constants';
import { StaticJsonRpcBatchProvider } from '@lidofinance/eth-providers';

import { useRpcUrl } from 'config';
import { getStaticRpcBatchProvider } from 'utils';

type Props = {
  chainId?: CHAINS;
};

export const useCurrentStaticRpcProvider = (
  props?: Props,
): {
  staticRpcProvider: StaticJsonRpcBatchProvider;
  chainId: CHAINS;
} => {
  const { chainId: currentChainId } = useSDK();

  const chosenChainId = props?.chainId ?? currentChainId;

  const rpcUrl = useRpcUrl(chosenChainId);
  const staticRpcProvider = useMemo(() => {
    return getStaticRpcBatchProvider(chosenChainId, rpcUrl);
  }, [chosenChainId, rpcUrl]);

  return {
    staticRpcProvider,
    chainId: chosenChainId,
  };
};
