import { Erc20Abi, getERC20Contract } from '@knine-sdk/contracts';
import { useChainId } from 'shared/hooks/useChainId';
import { useSDK, useWrapperSWR } from '@knine-sdk/react';
import { STRATEGY_CONSTANT } from 'utils';

export const useErc20TokensStaticData = (
  tokenAddresses: string[],
  tokenProperty: keyof Pick<
    Erc20Abi,
    'symbol' | 'name' | 'totalSupply' | 'decimals'
  >,
) => {
  const { defaultChain } = useChainId();
  const { providerRpc: currentProviderRpc, providersRpcSupportedChains } =
    useSDK();

  const providerRpc =
    providersRpcSupportedChains?.[defaultChain] ?? currentProviderRpc;

  const { data, initialLoading, error } = useWrapperSWR(
    !!providerRpc && tokenAddresses.length > 0
      ? [`swr:tokens-data-${tokenAddresses.join(',')}`]
      : null,
    async () => {
      const contracts = tokenAddresses.map((address) =>
        getERC20Contract(address, providerRpc),
      );

      const response = await Promise.all(
        contracts.map((contract) => contract[tokenProperty]()),
      );

      return response;
    },
    {
      ...STRATEGY_CONSTANT,
      shouldRetryOnError: false,
    },
  );

  return { data, initialLoading, error };
};
