import { Stack } from '@mui/material';
import { EditableInputGroupHookForm } from 'shared/hook-form/controls';
import { VestingFormProvider } from './form-context';
import { VestingBaseDataProvider } from 'providers/vesting';
import { VestingStatus } from 'features/vesting/features';
import { InfoText } from 'shared/components';

export const VestingForm = () => {
  return (
    <VestingBaseDataProvider>
      <VestingFormProvider>
        <Stack component="section" spacing={2.5} sx={{ maxWidth: 600 }}>
          <VestingStatus />

          <Stack direction="row" spacing={1.75}>
            <EditableInputGroupHookForm
              fieldName="backingRatio"
              placeholder="0"
              label="backingRatio"
              type="number"
              helperText={<InfoText text="BackingRatio > 0" />}
            />

            <EditableInputGroupHookForm
              fieldName="vestingRatio"
              placeholder="0"
              label="VestingRatio"
              type="number"
              helperText={<InfoText text="VestingRatio > 0" />}
            />

            <EditableInputGroupHookForm
              fieldName="vestingPeriod"
              placeholder="0"
              label="Vesting Period, days"
              type="number"
              helperText={<InfoText text="Vesting Period > 0" />}
            />
          </Stack>
        </Stack>
      </VestingFormProvider>
    </VestingBaseDataProvider>
  );
};
