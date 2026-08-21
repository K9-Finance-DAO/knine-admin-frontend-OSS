import { CACHE_DEFAULT_ERROR_HEADERS, CACHE_DEFAULT_HEADERS } from 'config';
import { RequestWrapper } from './decorateRequestHandler';

export type CacheControlArgs = {
  headers?: string;
  errorHeaders?: string;
};

export const cacheControl =
  (args?: CacheControlArgs): RequestWrapper =>
  async (req, res, next) => {
    const {
      headers = CACHE_DEFAULT_HEADERS,
      errorHeaders = CACHE_DEFAULT_ERROR_HEADERS,
    } = args || {};
    try {
      res.setHeader('Cache-Control', headers);

      await next?.(req, res, next);
    } catch (error) {
      // for requests with cache-control headers
      // need set new headers otherwise error will be cached
      res.setHeader('Cache-Control', errorHeaders);

      // throw error up the stack
      throw error;
    }
  };
