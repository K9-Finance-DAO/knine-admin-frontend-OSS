import { useWrapperSWR } from '@knine-sdk/react';
import { camelize, standardFetcher, STRATEGY_CONSTANT } from 'utils';
import { dynamics } from 'config';
import type { BonusPoolFieldsResponse, CurrentPool } from '../types';

const API_PATH = dynamics.knineAPIBasePath;

export const useBonusPoolData = (pool: CurrentPool | null) => {
  const { data, initialLoading, error, update } =
    useWrapperSWR<BonusPoolFieldsResponse>(
      pool !== null
        ? [`swr-bonus-pool-form-${pool.address}`, pool.address, pool.poolId]
        : null,
      async () => {
        const { address, poolId } = pool ?? {};

        const apiUrl = `${API_PATH}/farming-pools/${address}/bonus-pools/${poolId}`;

        const response = await standardFetcher(apiUrl);
        const camelizedData = camelize(response) as BonusPoolFieldsResponse;

        return {
          ...camelizedData,
          startTime: new Date(Number(camelizedData.startTime) * 1000),
          endTime: new Date(Number(camelizedData.endTime) * 1000),
        };
      },
      {
        ...STRATEGY_CONSTANT,
        shouldRetryOnError: false,
      },
    );

  return { data, initialLoading, error, update };
};
