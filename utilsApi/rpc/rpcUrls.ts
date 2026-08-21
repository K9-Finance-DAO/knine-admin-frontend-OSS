import getConfig from 'next/config';
import { CHAINS_IDS } from 'utils/chains';

const { serverRuntimeConfig } = getConfig();
const { rpcUrls_1, rpcUrls_5, rpcUrls_11155111, rpcUrls_157, rpcUrls_109 } =
  serverRuntimeConfig;

export const rpcUrls: Record<CHAINS_IDS, [string, ...string[]]> = {
  [CHAINS_IDS.Mainnet]: rpcUrls_1,
  [CHAINS_IDS.Goerli]: rpcUrls_5,
  [CHAINS_IDS.Sepolia]: rpcUrls_11155111,
  [CHAINS_IDS.Shibarium]: rpcUrls_109,
  [CHAINS_IDS.Puppynet]: rpcUrls_157,
};
