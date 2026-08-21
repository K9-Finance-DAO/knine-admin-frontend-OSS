import { Fallback } from 'shared/wallet';
import { Stack } from '@mui/material';
import { StakingStatus, Fees, Addresses, Staking } from './features';
import { LiquidStakingBaseDataProvider } from 'providers/liquid-staking-base-info';
import { Section } from 'shared/components';
import NoSSRWrapper from 'shared/components/no-ssr-wrapper';
import { LiquidStakingFormProvider } from './form/form-context';
import { FormController } from 'shared/hook-form/form-controller';
import { useClientConfig } from 'providers/client-config';
import { CHAINS } from '@knine-sdk/constants';

export const LiquidStakingSection = () => {
  const { liquidStakingDefaultChain } = useClientConfig();

  return (
    <NoSSRWrapper>
      <LiquidStakingBaseDataProvider>
        <LiquidStakingFormProvider>
          <Section component="section" pb={9}>
            <Fallback
              forcedChainId={liquidStakingDefaultChain as CHAINS}
              mb={3.5}
            />
            <StakingStatus />
            <Stack spacing={4} mt={3}>
              <FormController>
                <Fees />
                <Addresses />
                <Staking />
              </FormController>
            </Stack>
          </Section>
        </LiquidStakingFormProvider>
      </LiquidStakingBaseDataProvider>
    </NoSSRWrapper>
  );
};
