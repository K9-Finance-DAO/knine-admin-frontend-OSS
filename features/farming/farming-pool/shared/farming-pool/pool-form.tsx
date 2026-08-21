import { Stack, Tooltip, Typography } from '@mui/material';
import { FormDatePickerRangeSpacer } from 'shared/components';
import { FarmingToken } from './farming-token';
import {
  CustomInputHookForm,
  EditableInputGroupHookForm,
  FormDatePicker,
  FileUploaderHookForm,
  TokenAmountInputHookForm,
} from 'shared/hook-form/controls';
import { HelperIcon } from 'shared/components/data-table-row/styles';

export const PoolForm = ({ edit = false }: { edit?: boolean }) => {
  return (
    <Stack direction="row" spacing={4}>
      <FileUploaderHookForm
        fieldName="poolLogo"
        size="big"
        title="Choose a image or drag&nbsp;&&nbsp;drop it here."
        uploadButtonText="Browse image"
        maxFileSize={2}
      />

      <Stack spacing={3}>
        <CustomInputHookForm
          fieldName="poolName"
          label="Name"
          placeholder="Farm naming"
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
            fieldName="startDate"
            dependedFieldName="endDate"
            disabled={edit}
            label="Start date"
            useUtc={edit}
          />
          <FormDatePickerRangeSpacer />
          <FormDatePicker
            fieldName="endDate"
            dependedFieldName="startDate"
            disabled={edit}
            label="End date"
            useUtc={edit}
          />
        </Stack>

        <FarmingToken title="Token A" fieldName="token0" edit={edit} />
        <FarmingToken title="Token B" fieldName="token1" edit={edit} />
        <FarmingToken
          title="Reward token"
          fieldName="tokenReward"
          edit={edit}
        />

        {edit ? (
          <EditableInputGroupHookForm
            fieldName="rps"
            placeholder="1.3"
            inputType="amountBn"
            label="Reward per second"
            sx={{ maxWidth: 230 }}
          />
        ) : (
          <TokenAmountInputHookForm
            fieldName="rps"
            label="Reward per second"
            placeholder="1.3"
            sx={{ maxWidth: 230 }}
          />
        )}
      </Stack>
    </Stack>
  );
};
