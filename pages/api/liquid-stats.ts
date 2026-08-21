import { Cache } from 'memory-cache';
import { CACHE_LIQUID_STATS_KEY, CACHE_LIQUID_STATS_TTL } from 'config';
import {
  getLiquidStats,
  errorAndCacheDefaultWrappers,
  rateLimit,
  decorateRequestHandler,
} from 'utilsApi';
import type { API } from 'types';

const cache = new Cache<typeof CACHE_LIQUID_STATS_KEY, unknown>();

const liquidStats: API = async (req, res) => {
  const cachedStats = cache.get(CACHE_LIQUID_STATS_KEY);

  if (cachedStats) {
    res.status(200).json(cachedStats);
  } else {
    const liquidStats = await getLiquidStats();

    const response = {
      ...liquidStats,
      holders: String(liquidStats.holders),
    };

    cache.put(CACHE_LIQUID_STATS_KEY, response, CACHE_LIQUID_STATS_TTL);
    res.status(200).json(response);
  }
};

export default decorateRequestHandler([
  rateLimit,
  ...errorAndCacheDefaultWrappers,
])(liquidStats);
