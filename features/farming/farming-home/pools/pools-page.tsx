import { Skeleton } from '@mui/material';
import { times } from 'lodash';
import { useFarmingPools } from './hooks/useFarmingPools';
import { FarmingPoolItem } from './components/farming-pool-item';
import { memo, useEffect } from 'react';

type Props = {
  index: number;
  setTotalPages?: (amount: number) => void;
};

export const PoolsPage = memo(({ index, setTotalPages }: Props) => {
  const { data, initialLoading } = useFarmingPools(index);

  useEffect(() => {
    if (setTotalPages !== undefined) {
      setTotalPages(data.totalPages); // Assuming your API returns total pages
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {initialLoading &&
        times(3).map((_, index) => (
          <Skeleton key={index} variant="rounded" width="100%" height={194} />
        ))}
      {!initialLoading &&
        data?.results?.length &&
        data.results.map(
          (item) =>
            item.address && <FarmingPoolItem key={item.address} {...item} />,
        )}
    </>
  );
});

PoolsPage.displayName = 'PoolsPage';
