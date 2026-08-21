import { CHAINS } from '@knine-sdk/constants';
import { StaticJsonRpcBatchProvider } from '@knine-sdk/fetch';
import { useGetRpcUrlByChainId } from 'config';
import { useMemo } from 'react';
import { getNewChainIdByCurrent, getStaticRpcBatchProvider } from 'utils';
import { useSDK } from '@knine-sdk/react';

interface IUseNewStaticRpcProvider {
  providedChainId?: CHAINS;
  cacheSeed?: number;
  pollingInterval?: number;
}

export const useInitStaticRpcProviderByCurrentChain = ({
  providedChainId,
  cacheSeed,
  pollingInterval,
}: IUseNewStaticRpcProvider = {}): {
  staticRpcProvider: StaticJsonRpcBatchProvider;
  chainId: CHAINS;
} => {
  const { chainId: currentChainId } = useSDK();
  const getRpcUrl = useGetRpcUrlByChainId();

  const chainId = useMemo(
    () => providedChainId ?? getNewChainIdByCurrent(currentChainId),
    [currentChainId, providedChainId],
  );

  const StaticRpcProvider = useMemo(() => {
    return getStaticRpcBatchProvider(
      chainId,
      getRpcUrl(chainId),
      cacheSeed,
      pollingInterval,
    );
  }, [cacheSeed, chainId, getRpcUrl, pollingInterval]);

  return {
    chainId: chainId,
    staticRpcProvider: StaticRpcProvider,
  };
};
