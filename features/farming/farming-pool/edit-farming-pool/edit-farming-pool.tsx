import { Stack } from '@mui/material';
import { FARMING_PATH } from 'config/urls';
import { BackLink } from 'shared/components';
import NoSSRWrapper from 'shared/components/no-ssr-wrapper';
import { EditFarmingPoolTabs } from './edit-farming-pool-tabs';
import { PoolDataProvider } from './pool-data-context';

export const EditFarmingPool = () => {
  return (
    <Stack pt={3} pb={6}>
      <BackLink href={FARMING_PATH}>Back to farms</BackLink>

      <NoSSRWrapper>
        <PoolDataProvider>
          <EditFarmingPoolTabs />
        </PoolDataProvider>
      </NoSSRWrapper>
    </Stack>
  );
};
