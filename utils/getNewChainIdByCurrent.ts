import { CHAINS } from '@knine-sdk/constants';

// TODO: think how to do better
export const getNewChainIdByCurrent = (currentChainId: CHAINS) => {
  switch (currentChainId) {
    case CHAINS.Mainnet:
      return CHAINS.Shibarium;
    case CHAINS.Sepolia:
      return CHAINS.Puppynet;
    case CHAINS.Puppynet:
      return CHAINS.Sepolia;
    case CHAINS.Shibarium:
      return CHAINS.Mainnet;
    default:
      return CHAINS.Shibarium;
  }
};
