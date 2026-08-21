import { FC, PropsWithChildren, useMemo } from 'react';
import { RnbWeb3Root, getConnectors } from 'rnb-web3/core-react';
import {
  WagmiConfig,
  createClient,
  configureChains,
  Chain,
  sepolia,
} from 'wagmi';
import * as wagmiChains from 'wagmi/chains';

import { CHAINS_IDS } from 'utils/chains';

import { useClientConfig } from 'providers/client-config';
import { useGetRpcUrlByChainId } from 'config';
import { SDKLegacyProvider } from './sdk-legacy';
import { ConnectWalletsModal } from 'shared/wallet';
import { getStaticRpcBatchProvider } from 'utils';

const POLLING_INTERVAL = 12000;

// TODO: move out
export const puppynet = {
  id: 157,
  network: 'puppynet',
  name: 'Puppynet',
  nativeCurrency: { name: 'BONE', symbol: 'BONE', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://puppynet.shibrpc.com'],
    },
    public: {
      http: ['https://puppynet.shibrpc.com'],
    },
  },
  contracts: {},
  testnet: true,
} as const satisfies Chain;

const wagmiChainsArray = Object.values({ ...wagmiChains, sepolia, puppynet });

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const {
    defaultChain: defaultChainId,
    supportedChainIds,
    walletconnectProjectId,
  } = useClientConfig();

  const { supportedChains, defaultChain } = useMemo(() => {
    const supportedChains = wagmiChainsArray.filter((chain) =>
      supportedChainIds.includes(chain.id),
    );

    const defaultChain =
      supportedChains.find((chain) => chain.id === defaultChainId) ||
      supportedChains[0]; // first supported chain as fallback
    return { supportedChains, defaultChain };
  }, [defaultChainId, supportedChainIds]);

  const getRpcUrlByChainId = useGetRpcUrlByChainId();

  const backendRPC = useMemo(
    () =>
      supportedChainIds.reduce(
        (res, curr) => ({ ...res, [curr]: getRpcUrlByChainId(curr) }),
        {
          // Mainnet RPC is always required for some requests, e.g. ETH to USD price, ENS lookup
          [CHAINS_IDS.Mainnet]: getRpcUrlByChainId(CHAINS_IDS.Mainnet),
        },
      ),
    [supportedChainIds, getRpcUrlByChainId],
  );

  const client = useMemo(() => {
    const jsonRpcBatchProvider = (chain: Chain) => {
      return {
        provider: () =>
          getStaticRpcBatchProvider(
            chain.id,
            getRpcUrlByChainId(chain.id),
            undefined,
            POLLING_INTERVAL,
          ),
        chain: {
          ...chain,
          rpcUrls: {
            ...chain.rpcUrls,
            public: { http: [getRpcUrlByChainId(chain.id)] },
            default: { http: [getRpcUrlByChainId(chain.id)] },
          },
        },
      };
    };

    const { chains, provider, webSocketProvider } = configureChains(
      supportedChains,
      [jsonRpcBatchProvider],
    );

    const connectors = getConnectors({
      chains,
      defaultChain,
      rpc: backendRPC,
      walletconnectProjectId,
    });

    return createClient({
      connectors,
      autoConnect: false, // default wagmi autoConnect, MUST be false in our case, because we use custom autoConnect from rnb-web3/
      provider,
      webSocketProvider,
    });
  }, [
    supportedChains,
    defaultChain,
    backendRPC,
    walletconnectProjectId,
    getRpcUrlByChainId,
  ]);

  return (
    <WagmiConfig client={client}>
      <RnbWeb3Root
        autoConnect={true}
        defaultChain={defaultChain}
        chains={supportedChains}
        rpc={backendRPC}
        walletconnectProjectId={walletconnectProjectId}
      >
        <SDKLegacyProvider
          defaultChainId={defaultChain.id}
          supportedChains={supportedChains}
          rpc={backendRPC}
        >
          {children}
          <ConnectWalletsModal />
        </SDKLegacyProvider>
      </RnbWeb3Root>
    </WagmiConfig>
  );
};

export default Web3Provider;
