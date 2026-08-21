import { formatEther } from '@ethersproject/units';
import { getStaticRpcBatchProvider } from 'utils';
import { KnBoneFactory } from '@knine-sdk/contracts';
import { getTokenAddress, TOKENS } from '@knine-sdk/constants';
import { CHAINS_IDS } from 'utils/chains';
import { HEALTHY_RPC_SERVICES_ARE_OVER } from 'config';
import { rpcUrls } from 'utilsApi';

export const getTotalStaked = async (
  chainId = CHAINS_IDS.Mainnet,
): Promise<string> => {
  const urls = rpcUrls[chainId];
  return getTotalStakedWithFallbacks(urls, 0, chainId);
};

const getTotalStakedWithFallbacks = async (
  urls: Array<string>,
  urlIndex: number,
  chainId = CHAINS_IDS.Mainnet,
): Promise<string> => {
  try {
    const staticProvider = getStaticRpcBatchProvider(chainId, urls[urlIndex]);

    const knBoneAddress = getTokenAddress(chainId as number, TOKENS.KNBONE);
    const knBoneContract = KnBoneFactory.connect(knBoneAddress, staticProvider);

    const totalSupplyKnBoneWei = await knBoneContract.totalSupply();

    const totalSupplyKnBone = formatEther(totalSupplyKnBoneWei);
    return Number(totalSupplyKnBone).toFixed(8);
  } catch (error) {
    if (urlIndex >= urls.length - 1) {
      const error = `[getTotalStaked] ${HEALTHY_RPC_SERVICES_ARE_OVER}`;
      console.error(error);
      throw new Error(error);
    }
    return await getTotalStakedWithFallbacks(urls, urlIndex + 1, chainId);
  }
};
