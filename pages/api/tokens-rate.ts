import { Cache } from 'memory-cache';
import {
  CACHE_TOKENS_RATE_KEY,
  CACHE_TOKENS_RATE_TTL,
  CACHE_TOKENS_RATE_HEADERS,
} from 'config';
import {
  cacheControl,
  defaultErrorHandler,
  rateLimit,
  decorateRequestHandler,
  getTokensRate,
} from 'utilsApi';
import { API } from 'types';

const cache = new Cache<typeof CACHE_TOKENS_RATE_KEY, unknown>();

const tokensRate: API = async (req, res) => {
  const cachedRate = cache.get(CACHE_TOKENS_RATE_KEY);

  if (cachedRate) {
    res.json(cachedRate);
  } else {
    const rate = await getTokensRate();
    cache.put(CACHE_TOKENS_RATE_KEY, rate, CACHE_TOKENS_RATE_TTL);

    res.json(rate);
  }
};

export default decorateRequestHandler([
  rateLimit,
  cacheControl({ headers: CACHE_TOKENS_RATE_HEADERS }),
  defaultErrorHandler,
])(tokensRate);
