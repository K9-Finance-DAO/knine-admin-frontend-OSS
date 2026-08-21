import getConfig from 'next/config';
import { CHAINS_IDS } from 'utils/chains';
import type { SubgraphChains } from 'types';

const { serverRuntimeConfig } = getConfig();
export const SUBGRAPH_URL = {
  [CHAINS_IDS.Mainnet]: serverRuntimeConfig.subgraphMainnet,
  [CHAINS_IDS.Sepolia]: serverRuntimeConfig.subgraphSepolia,
  [CHAINS_IDS.Shibarium]: '',
  [CHAINS_IDS.Puppynet]: '',
} as const;

export const getSubgraphUrl = (chainId: SubgraphChains): string | undefined => {
  return SUBGRAPH_URL[chainId];
};
