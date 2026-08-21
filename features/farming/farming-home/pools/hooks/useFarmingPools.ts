import { camelize, standardFetcher, STRATEGY_CONSTANT } from 'utils';
import { dynamics } from 'config';
import { FarmingPool } from '../types';
import { PaginatedResponse } from 'types';
import { useWrapperSWR } from '@knine-sdk/react';

export type FarmingPoolsResponse = PaginatedResponse<FarmingPool>;

const API_PATH = dynamics.knineAPIBasePath;

export const useFarmingPools = (pageIndex: number) => {
  const apiUrl = `${API_PATH}/farming-pools/?page=${pageIndex}`;
  const { data, initialLoading } = useWrapperSWR<FarmingPoolsResponse>(
    apiUrl,
    standardFetcher,
    {
      ...STRATEGY_CONSTANT,
      shouldRetryOnError: false,
    },
  );

  return { data: camelize(data) as FarmingPoolsResponse, initialLoading };
};
