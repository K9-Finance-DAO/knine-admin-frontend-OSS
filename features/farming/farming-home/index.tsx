import { Stack } from '@mui/material';
import { ZappingForm } from 'features/farming/farming-home/zapping/zapping-form';
import { Fallback } from 'shared/wallet';
import { useChainId } from 'shared/hooks';
import NoSSRWrapper from 'shared/components/no-ssr-wrapper';
import { Pools } from 'features/farming/farming-home/pools/pools';

export const FarmingHome = () => {
  const { defaultChain } = useChainId();

  return (
    <Stack pt={2}>
      <NoSSRWrapper>
        <Fallback forcedChainId={defaultChain} mb={3.5} />
        <ZappingForm />
        <Pools />
      </NoSSRWrapper>
    </Stack>
  );
};
