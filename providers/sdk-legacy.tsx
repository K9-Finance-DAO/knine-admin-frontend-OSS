import React, { useEffect, useMemo, useState } from 'react';
import { ProviderSDK } from '@knine-sdk/react';
import { BaseProvider, Web3Provider } from '@ethersproject/providers';
import { Chain, useAccount } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { useWeb3 } from 'rnb-web3/web3-react';
import { getStaticRpcBatchProvider } from 'utils';
import { CHAINS } from '@knine-sdk/constants';

const POLLING_INTERVAL = 12_000;

type ProvidersByChain = {
  [key in CHAINS]: BaseProvider;
};

// TODO: improve later, Note: this is hotfix solution to track web3provider update after reload
export const RELOAD_WEB3_PROVIDER_FLAG_KEY = 'reloadWeb3ProviderFlag';
export const setWeb3ProviderReloadFlag = () =>
  localStorage.setItem(RELOAD_WEB3_PROVIDER_FLAG_KEY, 'true');
export const clearWeb3ProviderReloadFlag = () =>
  localStorage.removeItem(RELOAD_WEB3_PROVIDER_FLAG_KEY);
export const getReloadWeb3ProviderFlag = () =>
  localStorage.getItem(RELOAD_WEB3_PROVIDER_FLAG_KEY);

export const resetWeb3ProviderWithReload = () => {
  clearWeb3ProviderReloadFlag();
  window.location.reload();
};

export const SDKLegacyProvider = (props: {
  children?: React.ReactNode;
  defaultChainId: number;
  supportedChains: Chain[];
  rpc: Record<number, string>;
  pollingInterval?: number;
}) => {
  const {
    children,
    defaultChainId,
    rpc,
    supportedChains,
    pollingInterval = POLLING_INTERVAL,
  } = props;
  const { chainId = defaultChainId, account } = useWeb3();
  const { connector, isConnected } = useAccount();
  const [providerWeb3, setProviderWeb3] = useState<Web3Provider>();

  // Reset web3 provider if the provider was set previously,
  // and currently no wallet is connected.
  // Gets triggered on a wallet disconnection, for example.
  if (!isConnected && providerWeb3) {
    setProviderWeb3(undefined);
  }

  useEffect(() => {
    void (async () => {
      if (!providerWeb3 && connector && isConnected) {
        const provider = await connector.getProvider();
        // `any` param + page reload on network change
        // are described here: https://github.com/ethers-io/ethers.js/issues/866
        // this approach is needed to fix a NETWORK_ERROR after chain changing
        const wrappedProvider = new Web3Provider(provider, 'any');

        clearWeb3ProviderReloadFlag();
        wrappedProvider.on('network', (newNetwork, oldNetwork) => {
          // When a Provider makes its initial connection, it emits a "network"
          // event with a null oldNetwork along with the newNetwork. So, if the
          // oldNetwork exists, it represents a changing network
          if (oldNetwork) {
            resetWeb3ProviderWithReload();
          }
        });
        wrappedProvider.pollingInterval = pollingInterval;
        setProviderWeb3(wrappedProvider);
      }
    })();
  }, [connector, isConnected, pollingInterval, providerWeb3]);

  const supportedChainIds = supportedChains.map((chain) => chain.id);

  const providersRpcSupportedChains = useMemo(
    () =>
      supportedChainIds.reduce((providersMap: ProvidersByChain, id) => {
        providersMap[id as CHAINS] = getStaticRpcBatchProvider(
          id,
          rpc[id],
          0,
          pollingInterval,
        );
        return providersMap;
      }, {} as ProvidersByChain),
    [pollingInterval, rpc, supportedChainIds],
  );

  const currentProviderRpc = getStaticRpcBatchProvider(
    chainId,
    rpc[chainId],
    0,
    pollingInterval,
  );

  const providerMainnetRpc = getStaticRpcBatchProvider(
    mainnet.id,
    rpc[mainnet.id],
    0,
    pollingInterval,
  );

  return (
    // @ts-expect-error Property children does not exist on type
    <ProviderSDK
      chainId={chainId}
      supportedChainIds={supportedChainIds}
      providerWeb3={providerWeb3}
      providerRpc={currentProviderRpc}
      providerMainnetRpc={providerMainnetRpc}
      account={account ?? undefined}
      providersRpcSupportedChains={providersRpcSupportedChains}
    >
      {children}
    </ProviderSDK>
  );
};
