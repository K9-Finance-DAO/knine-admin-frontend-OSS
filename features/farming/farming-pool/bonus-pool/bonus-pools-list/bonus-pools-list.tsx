import { Button, Stack, Typography } from '@mui/material';
import { Section, Spinner } from 'shared/components';
import { FarmingBonusPoolItem } from './pool-item';
import { useChainId } from 'shared/hooks';
import { useBonusPoolsData, useFormDrawer } from '../context';

export const BonusPoolsList = () => {
  const { defaultChain } = useChainId();
  const { openEditForm } = useFormDrawer();
  const { bonusPoolList, loadMore, canLoadMore, isEmpty, initialLoading } =
    useBonusPoolsData();

  if (!bonusPoolList && initialLoading) {
    return (
      <Stack mt={2} alignItems="center">
        <Spinner />
      </Stack>
    );
  }

  if (isEmpty) {
    return (
      <Typography variant="h5" mt={3} textAlign="center" color="gray-secondary">
        No bonus pools
      </Typography>
    );
  }

  return (
    <Section spacing={2} mt={3.5} alignItems="center">
      {bonusPoolList?.length &&
        bonusPoolList.map((pool) => (
          <FarmingBonusPoolItem
            key={pool.id}
            id={+pool.poolId}
            poolLogo={pool.poolLogo}
            startTime={pool.startTime}
            poolName={pool.poolName}
            endTime={pool.endTime}
            rewardToken={pool.rewardToken}
            rps={pool.rps}
            chainId={defaultChain}
            status={pool.status}
            onEditClick={() =>
              openEditForm({
                address: pool.farmingPoolAddress,
                poolId: pool.id,
              })
            }
          />
        ))}

      {canLoadMore && (
        <Button
          onClick={loadMore}
          sx={{ width: 'fit-content', margin: '18px auto' }}
        >
          Load more
        </Button>
      )}
    </Section>
  );
};
