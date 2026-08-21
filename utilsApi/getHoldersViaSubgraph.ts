import { Cache } from 'memory-cache';
import { standardFetcher } from 'utils/standardFetcher';
import { SubgraphChains } from 'types';
import { getSubgraphUrl } from './getSubgraphUrl';
import {
  CACHE_HOLDERS_VIA_SUBGRAPHS_KEY,
  CACHE_HOLDERS_VIA_SUBGRAPHS_TTL,
} from 'config';
import getConfig from 'next/config';
import ms from 'ms';
const { serverRuntimeConfig } = getConfig();

const SUBGRAPH_ERROR_MESSAGE =
  '[getHoldersViaSubgraph] Subgraph request failed.';

interface Holders extends Response {
  data: {
    stats: {
      uniqueAnytimeHolders: string;
      uniqueHolders: string;
    };
  };
}

const cache = new Cache<string, Holders>();

type GetHoldersViaSubgraph = (
  chainId: SubgraphChains,
) => Promise<Holders | null>;

export const getHoldersViaSubgraph: GetHoldersViaSubgraph = async (chainId) => {
  const cacheKey = `${CACHE_HOLDERS_VIA_SUBGRAPHS_KEY}_${chainId}`;
  console.debug('[getHoldersViaSubgraph]: Started fetching... ');

  const query = `
    query {
      stats (id: "") {
        uniqueHolders
        uniqueAnytimeHolders
      }
    }
  `;

  const controller = new AbortController();

  const TIMEOUT = +serverRuntimeConfig.subgraphRequestTimeout || ms('5s');
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  const params = {
    method: 'POST',
    body: JSON.stringify({ query }),
    signal: controller.signal,
  };

  const url = getSubgraphUrl(chainId);

  if (!url) {
    throw new Error(`Error: subgraph chain is not supported ${chainId}`);
  }

  try {
    const responseJSON = await standardFetcher<Holders>(url, params);

    clearTimeout(timeoutId);

    console.debug('[getHoldersViaSubgraph] Got holders:', responseJSON);

    cache.put(cacheKey, responseJSON, CACHE_HOLDERS_VIA_SUBGRAPHS_TTL);

    return responseJSON;
  } catch (error) {
    const data = cache.get(cacheKey);

    if (data) {
      console.error(`${SUBGRAPH_ERROR_MESSAGE} Using long-term cache...`);
      return data;
    }

    if (error instanceof Error) {
      throw new Error(error.message ?? SUBGRAPH_ERROR_MESSAGE);
    } else {
      throw new Error(SUBGRAPH_ERROR_MESSAGE);
    }
  }
};
