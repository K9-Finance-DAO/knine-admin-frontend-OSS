import type { NextApiRequest, NextApiResponse } from 'next';

const health = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).send({ status: 'ok' });
};

export default health;
