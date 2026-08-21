import getConfig from 'next/config';
import {
  defaultErrorHandler,
  rateLimit,
  httpMethodGuard,
  HttpMethod,
  cors,
  decorateRequestHandler,
  cacheControl,
} from 'utilsApi';
import { CACHE_REWARDS_HEADERS } from 'config';
import { API } from 'types';
import { standardFetcher } from 'utils/standardFetcher';

const { serverRuntimeConfig } = getConfig();
const { knineBackendApi } = serverRuntimeConfig;

const TIMEOUT = 10_000;

const rewards: API = async (req, res) => {
  if (!req.query.address) {
    res.status(400).json({ status: 'invalid request' });
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  const query = req.query;
  const params = new URLSearchParams();

  Object.entries(query).forEach(
    ([k, v]) =>
      v && params.append(k, Array.isArray(v) ? v[0].toString() : v.toString()),
  );

  const result = await standardFetcher(
    `${knineBackendApi}/rewards/?${params.toString()}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    },
  );

  res.status(200).json(result);

  clearTimeout(timeoutId);
};

export default decorateRequestHandler([
  httpMethodGuard([HttpMethod.GET]),
  cors({ origin: ['*'], methods: [HttpMethod.GET] }),
  rateLimit,
  cacheControl({ headers: CACHE_REWARDS_HEADERS }),
  defaultErrorHandler,
])(rewards);
