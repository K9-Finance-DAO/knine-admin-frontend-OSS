import { CHAINS, getWithdrawalQueueAddress } from '@knine-sdk/constants';

export const NFT_URL_PREFIX_BY_NETWORK: {
  [key in CHAINS]?: (nftId: string, contract: string) => string;
} = {
  [CHAINS.Mainnet]: (nftId, contract) =>
    `https://etherscan.io/nft/${contract}/${nftId}`,
  [CHAINS.Sepolia]: (nftId, contract) =>
    `https://sepolia.etherscan.io/nft/${contract}/${nftId}`,
};

export const getNFTUrl = (tokenId: string, chainId?: CHAINS) => {
  if (!chainId) return '';
  const contractAddress = getWithdrawalQueueAddress(chainId);

  return NFT_URL_PREFIX_BY_NETWORK[chainId]?.(tokenId, contractAddress) || '';
};
