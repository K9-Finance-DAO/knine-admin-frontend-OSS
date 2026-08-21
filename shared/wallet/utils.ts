import { CHAINS } from '@knine-sdk/constants';
import EthereumDarkGradient from 'assets/icons/ethereum-gradient.svg';
import Shibarium from 'assets/icons/shibarium.svg';

interface ChainInfo {
  logo: string;
  name: string;
}

export const chainsInfo: Record<'ethereum' | 'shibarium', ChainInfo> = {
  ethereum: {
    logo: EthereumDarkGradient,
    name: 'Ethereum',
  },
  shibarium: {
    logo: Shibarium,
    name: 'Shibarium',
  },
};

export const chainToChainInfoHashMap: Record<number, ChainInfo> = {
  [CHAINS.Mainnet]: chainsInfo.ethereum,
  [CHAINS.Sepolia]: chainsInfo.ethereum,
  [CHAINS.Shibarium]: chainsInfo.shibarium,
  [CHAINS.Puppynet]: chainsInfo.shibarium,
};
