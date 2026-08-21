import { getStaticRpcBatchProvider } from 'utils';
import { rpcUrls } from 'utilsApi';
import { getAggregatorContract } from '@knine-sdk/contracts';
import { CHAINS, getAggregatorAddress } from '@knine-sdk/constants';
import { iterateUrls } from './rpc/iterateUrls';

export const getEthPrice = async (): Promise<number> => {
  const urls = rpcUrls[CHAINS.Mainnet];
  return iterateUrls(urls, (url) => getEthPriceWithFallbacks(url));
};

const getEthPriceWithFallbacks = async (url: string): Promise<number> => {
  const address = getAggregatorAddress(CHAINS.Mainnet);
  const chainId = CHAINS.Mainnet;
  const staticProvider = getStaticRpcBatchProvider(chainId, url);

  const contract = getAggregatorContract(address, staticProvider);

  // TODO: maybe without Promise.all
  const [decimals, latestAnswer] = await Promise.all([
    contract.decimals(),
    contract.latestAnswer(),
  ]);

  return latestAnswer.toNumber() / 10 ** decimals;
};
