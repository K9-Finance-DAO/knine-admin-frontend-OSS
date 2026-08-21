import { SectionHeader } from 'shared/components';
import { Stack } from '@mui/material';
import { AddPoolButton } from './components';
import { PoolList } from 'features/farming/farming-home/pools/pool-list';

export const Pools = () => {
  return (
    <Stack spacing={2} paddingBottom="114px" mt={2}>
      <SectionHeader
        title="Pools"
        alignItems="flex-end"
        actionsSlot={<AddPoolButton />}
      />
      <PoolList />
    </Stack>
  );
};
