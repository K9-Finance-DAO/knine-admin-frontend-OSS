import { Stack, Tooltip, Typography } from '@mui/material';
import { FormDatePickerRangeSpacer, FormTextarea } from 'shared/components';
import { CustomInputHookForm, FormDatePicker } from 'shared/hook-form/controls';
import { FormTitle } from './form-title';
import { HelperIcon } from 'shared/components/data-table-row/styles';

export const BonusPoolFormInfo = ({ edit }: { edit: boolean }) => {
  return (
    <Stack spacing={3}>
      <FormTitle>Info</FormTitle>

      <CustomInputHookForm
        fieldName="poolName"
        label="Name"
        placeholder="Farm naming"
      />
      <CustomInputHookForm
        label="Address token"
        fieldName="rewardToken"
        disabled={edit}
        placeholder="0x76F2a66D8Af418113725e3bAc20BFCb4F92d63b5"
      />
      <CustomInputHookForm
        fieldName="rps"
        label="Reward per second"
        placeholder="0.00"
        disabled={edit}
        sx={{ maxWidth: 230 }}
      />

      <Typography>
        Period
        <Tooltip title="Choose a date (GMT+00)" placement="right-start">
          <HelperIcon />
        </Tooltip>
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        mt="12px !important"
      >
        <FormDatePicker
          fieldName="startTime"
          dependedFieldName="endTime"
          disabled={edit}
          label="Start date"
          useUtc={edit}
        />
        <FormDatePickerRangeSpacer />
        <FormDatePicker
          fieldName="endTime"
          dependedFieldName="startTime"
          disabled={edit}
          label="End date"
          useUtc={edit}
        />
      </Stack>
      <FormTextarea
        label="Description"
        placeholder="Placeholder text..."
        fieldName="description"
        minRows={7}
      />
    </Stack>
  );
};
