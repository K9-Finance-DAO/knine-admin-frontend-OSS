import getConfig from 'next/config';
import { Cache } from 'memory-cache';

import { CACHE_SHORT_STATS_KEY, CACHE_SHORT_STATS_TTL } from 'config';
import { API, SubgraphChains } from 'types';
import {
  cors,
  decorateRequestHandler,
  errorAndCacheDefaultWrappers,
  getHoldersViaSubgraph,
  getTotalStaked,
  HttpMethod,
  httpMethodGuard,
  rateLimit,
} from 'utilsApi';
import { parallelizePromises } from 'utils';

const { serverRuntimeConfig } = getConfig();
const { liquidStakingDefaultChain } = serverRuntimeConfig;

const cache = new Cache<string, unknown>();

// Proxy for third-party API.
// Returns stETH token information
// TODO: maybe we dont need this anymore, because .../stats give us all statistic (come back later for decision)
const shortLiquidStakingStats: API = async (req, res) => {
  const chainId =
    (Number(req.query.chainId) as SubgraphChains) || liquidStakingDefaultChain;
  const cacheKey = `${CACHE_SHORT_STATS_KEY}_${chainId}`;

  const cachedLiquidStakingStats = cache.get(cacheKey);
  if (cachedLiquidStakingStats) {
    res.status(200).json(cachedLiquidStakingStats);
  } else {
    const [
      holders,
      totalStaked,
      // stEthPrice
    ] = await parallelizePromises([
      getHoldersViaSubgraph(chainId),
      getTotalStaked(chainId),
      // getStEthPrice(),
    ]);

    const { uniqueHolders, uniqueAnytimeHolders } = holders?.data?.stats ?? {};

    const stats = {
      uniqueAnytimeHolders: uniqueAnytimeHolders,
      uniqueHolders: uniqueHolders,
      totalStaked,
      // marketCap: Number(totalStaked) * stEthPrice,
      marketCap: 0,
    };

    // set the cache if there is all the data
    // because right now there is no request error handling in parallelizePromises
    if (totalStaked && holders) {
      // TODO: add stEthPrice here
      cache.put(cacheKey, stats, CACHE_SHORT_STATS_TTL);
    }

    res.status(200).json(stats);
  }
};

export default decorateRequestHandler([
  httpMethodGuard([HttpMethod.GET]),
  cors({ origin: ['*'], methods: [HttpMethod.GET] }),
  rateLimit,
  ...errorAndCacheDefaultWrappers,
])(shortLiquidStakingStats);
