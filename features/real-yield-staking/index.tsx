import { Section } from 'shared/components';
import { MaxLockupMultiplierForm, RealYieldStatistics } from './components';
import { Stack } from '@mui/material';
import { RealYieldStatus, RewardPerSecondForm } from './components';
import { Fallback } from 'shared/wallet';
import { useClientConfig } from 'providers/client-config';
import NoSsrWrapper from 'shared/components/no-ssr-wrapper';

export const RealYieldStakingSection = () => {
  const { defaultChain } = useClientConfig();

  return (
    <NoSsrWrapper>
      <Section>
        <Fallback forcedChainId={defaultChain} />
        <RealYieldStatistics />
        <Stack spacing={2} maxWidth={466}>
          <RealYieldStatus />
          <MaxLockupMultiplierForm />
          <RewardPerSecondForm />
        </Stack>
      </Section>
    </NoSsrWrapper>
  );
};
