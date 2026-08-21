import { Stack } from '@mui/material';
import { SectionHeader } from 'shared/components';
import { FontWeights } from 'styles';
import { VestingForm } from './form';
import { CHAINS } from '@knine-sdk/constants';
import { Fallback } from 'shared/wallet';
import { useChainId } from 'shared/hooks';
import NoSSRWrapper from 'shared/components/no-ssr-wrapper';
import { EmergencyStop } from 'features/vesting/features';

export const VestingSection = () => {
  const { defaultChain } = useChainId();
  return (
    <NoSSRWrapper>
      <Stack spacing={2} pt={3.25}>
        <Fallback forcedChainId={defaultChain as CHAINS} mb={3.5} />
        <SectionHeader
          title="Configurate or shut down"
          titleProps={{
            variant: 'h5',
            fontWeight: FontWeights.Medium,
          }}
          titleClassName="white"
          actionsSlot={<EmergencyStop />}
          pb={3.25}
        />

        <VestingForm />
      </Stack>
    </NoSSRWrapper>
  );
};
