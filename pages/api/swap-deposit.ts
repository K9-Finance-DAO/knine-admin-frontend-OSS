import {
  cors,
  decorateRequestHandler,
  defaultErrorHandler,
  HttpMethod,
  httpMethodGuard,
} from 'utilsApi';
import type { API } from 'types';
import getConfig from 'next/config';
import { NextApiRequest, NextApiResponse } from 'next';
import { CHAINS } from '@knine-sdk/constants';

const { serverRuntimeConfig } = getConfig();
const { bridgeBaseApi } = serverRuntimeConfig;

const validateAndGetParams = (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: implement caching, NOTE: temporary polling moved to the client, if in production we wont move it back then we need cache
  const chainId = req.query?.chainId ?? CHAINS.Shibarium.toString();
  const txHash = req.query?.txHash ?? '';

  if (typeof chainId !== 'string' || typeof txHash !== 'string') {
    res.status(422).json({ error: `txHash and chainId must be a string` });
    return null;
  }

  const params = new URLSearchParams({
    tx_hash: txHash,
    chain_id: chainId,
  });

  return params;
};

const swapDeposit: API = async (req, res) => {
  const query = validateAndGetParams(req, res);

  const callBackend = async () => {
    const backendResponse = await fetch(
      `${bridgeBaseApi}/get_swap_by_deposit_tx?${query?.toString()}`,
      {
        method: HttpMethod.GET,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return await backendResponse.json();
  };

  try {
    const result = await callBackend();

    res.status(200).json(result);
  } catch (err: any) {
    res.status(503).json({ message: err?.message ?? err });
  }
};

export default decorateRequestHandler([
  httpMethodGuard([HttpMethod.GET]),
  cors({ origin: ['*'], methods: [HttpMethod.GET] }),
  defaultErrorHandler,
])(swapDeposit);
