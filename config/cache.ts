import ms from 'ms';

export const CACHE_SMA_APR_KEY = 'cache-sma-apr';
export const CACHE_SMA_APR_TTL = ms('30m');

export const CACHE_ETH_APR_KEY = 'cache-eth-apr';
export const CACHE_ETH_APR_TTL = ms('1h');

export const CACHE_LIQUID_STATS_KEY = 'cache-liquid-stats';
export const CACHE_LIQUID_STATS_TTL = ms('1h');

export const CACHE_SHORT_STATS_KEY = 'cache-short-stats';
export const CACHE_SHORT_STATS_TTL = ms('1h');

export const CACHE_HOLDERS_VIA_SUBGRAPHS_KEY =
  'cache-lido-holders-via-subgraphs';
export const CACHE_HOLDERS_VIA_SUBGRAPHS_TTL = ms('7d');

export const CACHE_ETH_PRICE_KEY = 'cache-eth-price';
export const CACHE_ETH_PRICE_TTL = ms('1m');
export const CACHE_ETH_PRICE_HEADERS =
  'public, max-age=60, stale-if-error=1200, stale-while-revalidate=30';

export const CACHE_TOTAL_SUPPLY_KEY = 'cache-total-supply';
export const CACHE_TOTAL_SUPPLY_TTL = ms('1m');
export const CACHE_TOTAL_SUPPLY_HEADERS =
  'public, max-age=60, stale-if-error=1200, stale-while-revalidate=30';

export const CACHE_DEFAULT_HEADERS =
  'public, max-age=180, stale-if-error=1200, stale-while-revalidate=60';
export const CACHE_REWARDS_HEADERS =
  'public, max-age=30, stale-if-error=1200, stale-while-revalidate=30';
export const CACHE_DEFAULT_ERROR_HEADERS = 'no-store, must-revalidate';

export const CACHE_TOKENS_RATE_KEY = 'cache-eth-price';
export const CACHE_TOKENS_RATE_TTL = ms('1m');
export const CACHE_TOKENS_RATE_HEADERS =
  'public, max-age=60, stale-if-error=1200, stale-while-revalidate=30';
