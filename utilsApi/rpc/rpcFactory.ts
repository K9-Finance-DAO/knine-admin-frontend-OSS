import { ReadableStream } from 'node:stream/web';
import type { NextApiRequest, NextApiResponse } from 'next';
import { iterateUrls } from './iterateUrls';
import { ClientSideError, isClientSide } from 'utils/isClientSide';
import type { FetchRpc, FetchRpcInitBody } from './fetchRpc';

const { Readable } = require('stream');

export type RpcProviders = Record<string | number, [string, ...string[]]>;

export const DEFAULT_API_ERROR_MESSAGE =
  'Something went wrong. Sorry, try again later :(';

export const HEALTHY_RPC_SERVICES_ARE_OVER = 'Healthy RPC services are over!';

export class UnsupportedChainIdError extends Error {
  constructor(message?: string) {
    super(message || 'Unsupported chainId');
  }
}

export class UnsupportedHTTPMethodError extends Error {
  constructor(message?: string) {
    super(message || 'Unsupported HTTP method');
  }
}

export type RPCFactoryParams = {
  providers: RpcProviders;
  fetchRpc: FetchRpc;
  defaultChain: string | number;
  allowedRPCMethods: string[];
};

export const rpcFactory = ({
  providers,
  fetchRpc,
  defaultChain,
  allowedRPCMethods,
}: RPCFactoryParams) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      // double check if its server side to import Readable :)
      if (isClientSide()) {
        throw new ClientSideError(
          'rpcFactory is not allowed on the client side.',
        );
      }

      // Accept only POST requests
      if (req.method !== 'POST') {
        // We don't care about tracking blocked requests here
        throw new UnsupportedHTTPMethodError();
      }

      const chainId = Number(req.query.chainId || defaultChain);

      // Allow only chainId of specified chains
      if (providers[chainId] == null) {
        // We don't care about tracking blocked requests here
        throw new UnsupportedChainIdError();
      }

      // TODO: consider returning array of validators instead of throwing error right away
      // Check if provided methods are allowed
      for (const { method } of Array.isArray(req.body)
        ? req.body
        : [req.body]) {
        if (typeof method !== 'string') {
          throw new Error(`RPC method isn't string`);
        }
        if (!allowedRPCMethods.includes(method)) {
          throw new Error(`RPC method ${method} isn't allowed`);
        }
      }

      const requested = await iterateUrls(providers[chainId], (url) =>
        fetchRpc(url, { body: req.body as FetchRpcInitBody }),
      );

      res.setHeader(
        'Content-Type',
        requested.headers.get('Content-Type') ?? 'application/json',
      );

      if (requested.body) {
        Readable.fromWeb(requested.body as ReadableStream).pipe(res);
      } else {
        res
          .status(requested.status)
          .json('There are a problems with RPC provider');
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message ?? DEFAULT_API_ERROR_MESSAGE);
      } else {
        res.status(500).json(HEALTHY_RPC_SERVICES_ARE_OVER);
      }
    }
  };
};
