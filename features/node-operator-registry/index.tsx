import { Stack } from '@mui/material';
import { Fallback } from 'shared/wallet';
import NoSSRWrapper from 'shared/components/no-ssr-wrapper';
import { NodeOperatorFormProvider } from './form/form-context';
import { EditableInputGroupHookForm } from 'shared/hook-form/controls';
import { NodeOperatorStatus } from './features';
import { useClientConfig } from 'providers/client-config';
import { CHAINS } from '@knine-sdk/constants';
import { InfoText } from 'shared/components/custom-input/info-text';

export const NodeOperatorRegistry = () => {
  const { liquidStakingDefaultChain } = useClientConfig();
  return (
    <NoSSRWrapper>
      <NodeOperatorFormProvider>
        <Stack component="section" my={3.5} spacing={3} width="60%">
          <Fallback forcedChainId={liquidStakingDefaultChain as CHAINS} />

          <NodeOperatorStatus />
          <Stack spacing={2}>
            <EditableInputGroupHookForm
              fieldName="knBoneAddress"
              placeholder="0x"
              label="knBONE Address"
            />
            <EditableInputGroupHookForm
              fieldName="distanceThreshold"
              placeholder="0"
              percent
              isNumeric
              integer
              label="Set Target Distance Threshold"
              helperText={
                <InfoText text="Distance between min and max staked amount of operators (>=100%)" />
              }
            />
            <EditableInputGroupHookForm
              fieldName="minRequestWithdrawRange"
              placeholder="0"
              percent
              isNumeric
              integer
              label="Min Request Withdraw Range"
              helperText={
                <InfoText text="Minimum that may be withdrawn from the delegated amount(<=100%)" />
              }
            />
            <EditableInputGroupHookForm
              fieldName="maxWithdrawPercentagePerRebalance"
              placeholder="0"
              percent
              isNumeric
              integer
              label="Max Withdraw Percentage Per Rebalance"
              helperText={
                <InfoText text="Max withdraw percentage to withdraw from a validator per rebalance (<=100%)" />
              }
            />
          </Stack>
        </Stack>
      </NodeOperatorFormProvider>
    </NoSSRWrapper>
  );
};
