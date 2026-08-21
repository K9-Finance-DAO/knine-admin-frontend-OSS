import { NextApiRequest, NextApiResponse } from 'next';

export type API<T = void> = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<T>;

export type PaginatedResponse<T> = {
  total: number;
  resultsPerPage: number;
  totalPages: number;
  results: T[];
};
