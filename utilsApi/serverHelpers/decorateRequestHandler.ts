import { NextApiRequest, NextApiResponse } from 'next';

export type API<T = void> = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<T> | T;

export type RequestWrapper<T = void> = (
  req: NextApiRequest,
  res: NextApiResponse,
  next?: API<T> | RequestWrapper<T>,
) => Promise<T> | T;

export const decorateRequestHandler =
  <T = void>(wrappers: RequestWrapper<T>[]) =>
  (requestHandler: API<T>) =>
    wrappers.reduce(
      (acc, cur) => (req, res) => cur(req, res, () => acc(req, res)),
      requestHandler,
    );
