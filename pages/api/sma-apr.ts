import { Cache } from 'memory-cache';
import { API } from 'types';
import { CACHE_SMA_APR_KEY, CACHE_SMA_APR_TTL } from 'config';
import {
  errorAndCacheDefaultWrappers,
  rateLimit,
  getSmaStethApr,
  decorateRequestHandler,
} from 'utilsApi';

const cache = new Cache<typeof CACHE_SMA_APR_KEY, string>();

const smaApr: API = async (_, res) => {
  const cachedStethApr = cache.get(CACHE_SMA_APR_KEY);

  if (cachedStethApr) {
    res.json({ smaApr: cachedStethApr });
  } else {
    const smaApr = await getSmaStethApr();
    cache.put(CACHE_SMA_APR_KEY, smaApr, CACHE_SMA_APR_TTL);

    res.json({ smaApr });
  }
};

export default decorateRequestHandler([
  rateLimit,
  ...errorAndCacheDefaultWrappers,
])(smaApr);
