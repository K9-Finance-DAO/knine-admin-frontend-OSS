import { FC, PropsWithChildren, createContext, useContext } from 'react';

import invariant from 'tiny-invariant';
import { useRouter } from 'next/router';
import { useWrapperSWR } from '@knine-sdk/react';
import { CreatePoolRequest, FarmingPoolFormFields } from '../shared';
import { camelize, standardFetcher, STRATEGY_IMMUTABLE } from 'utils';
import { dynamics } from 'config';
const apiUrl = dynamics.knineAPIBasePath;

const usePoolData = () => {
  const { isReady, query } = useRouter();
  const address = isReady
    ? Array.isArray(query.id)
      ? query.id[0]
      : query.id
    : undefined;

  const { data, initialLoading, error, update } =
    useWrapperSWR<FarmingPoolFormFields>(
      address ? [`swr-farming-pool-${address}`, address] : null,
      async () => {
        const data = await standardFetcher(
          `${apiUrl}/farming-pools/${address}/`,
        );
        const camelizedData = camelize(data) as CreatePoolRequest;

        return {
          poolName: camelizedData?.poolName,
          poolLogo: camelizedData?.poolLogo,
          token0: {
            address: camelizedData?.token0Address,
            logo: camelizedData?.tokenALogo,
          },
          token1: {
            address: camelizedData?.token1Address,
            logo: camelizedData?.tokenBLogo,
          },
          tokenReward: {
            address: camelizedData?.rewardToken,
            logo: camelizedData?.rewardTokenLogo,
          },
          startDate: new Date(Number(camelizedData.startTime) * 1000),
          endDate: new Date(Number(camelizedData.endTime) * 1000),
          rps: camelizedData?.rps,
        };
      },
      {
        ...STRATEGY_IMMUTABLE,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        revalidateOnMount: true,
      },
    );

  return { data, initialLoading, error, update, address };
};

export type PoolDataValue = ReturnType<typeof usePoolData>;

const PoolDataContext = createContext<PoolDataValue | null>(null);
PoolDataContext.displayName = 'PoolDataContext';

export const PoolDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const farmingPoolData = usePoolData();

  return (
    <PoolDataContext.Provider value={farmingPoolData}>
      {children}
    </PoolDataContext.Provider>
  );
};

export const useFarmingPoolData = () => {
  const r = useContext(PoolDataContext);
  invariant(r, 'useFarmingPoolData was used outside of PoolDataContext');
  return r;
};
