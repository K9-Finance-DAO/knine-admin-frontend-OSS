import { Divider, Stack, Typography } from '@mui/material';
import { InfoText } from 'shared/components/custom-input/info-text';
import { EditableInputGroupHookForm } from 'shared/hook-form/controls';
import { InstantPoolStatus } from './instant-pool-status';
import { memo } from 'react';
import BoneImg from 'public/bone.webp';
import { WithImage } from 'shared/components';
import { FormatToken } from 'shared/formatters';
import { useInstantPoolAmount } from 'shared/hooks';
import { DEFAULT_FALLBACK } from 'config';

export const Staking = memo(() => {
  const { amount } = useInstantPoolAmount();
  return (
    <Stack spacing={2} mt={4}>
      <Typography className="medium">Staking</Typography>
      <Divider className="stroke" />

      <Stack spacing={1} direction="row">
        <Typography variant="body2" className="medium">
          Instant Pool Balance:
        </Typography>
        <WithImage
          imageProps={{
            src: BoneImg,
            alt: 'BONE',
          }}
          stackProps={{
            maxWidth: 150,
          }}
        >
          <FormatToken
            amount={amount}
            symbol="BONE"
            fallback={DEFAULT_FALLBACK}
          />
        </WithImage>
      </Stack>

      <InstantPoolStatus />
      <Stack direction={{ md: 'row' }} spacing={3}>
        <EditableInputGroupHookForm
          fieldName="rewardDistributionLowerBound"
          placeholder="0"
          tokenSymbol="BONE"
          inputType="amountBn"
          label="Reward Distribution Lower Bound"
          helperText={
            <InfoText text="Sets the minimum amount of accumulated rewards that can be distributed" />
          }
        />
        <EditableInputGroupHookForm
          fieldName="delegationLowerBound"
          placeholder="0"
          inputType="amountBn"
          tokenSymbol="BONE"
          label="Delegation Lower Bound"
          helperText={
            <InfoText text="Sets the minimum amount of BONE that can be delegated on delegation call" />
          }
        />
      </Stack>
    </Stack>
  );
});

Staking.displayName = 'Staking';
