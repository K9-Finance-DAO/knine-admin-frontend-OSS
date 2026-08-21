import { CHAINS } from '@knine-sdk/constants';

export const CHAIN_DISPLAY_NAMES = {
  [CHAINS.Sepolia]: 'Sepolia',
  [CHAINS.Mainnet]: 'Ethereum',
  [CHAINS.Puppynet]: 'Puppynet',
  [CHAINS.Shibarium]: 'Shibarium',
};

export const getChainDisplayName = (chain: keyof typeof CHAIN_DISPLAY_NAMES) =>
  CHAIN_DISPLAY_NAMES[chain];
