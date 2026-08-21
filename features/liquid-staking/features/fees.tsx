import { BorderedBox } from 'shared/components';
import { Divider, Stack, Typography } from '@mui/material';
import {
  EditableInputGroupHookForm,
  CustomInputHookForm,
  EditButtonGroupHookForm,
} from 'shared/hook-form/controls';
import { useStakeValidationResult } from 'features/liquid-staking/form/form-context';
import { InputMessageStyle } from 'shared/components/input-amount';
import { COLOR_RED, COLOR_STROKE } from 'styles';
import { getMaxSumErrorMessage } from 'shared/hook-form/yup';
import { MAX_FEE_TOTAL } from '../form/form-context/helper';

export const Fees = () => {
  const { feeInvalid } = useStakeValidationResult();

  return (
    <Stack spacing={2}>
      <Typography className="gray medium">Set Fees</Typography>
      <Divider className="stroke" />
      <EditableInputGroupHookForm
        fieldName="protocolFee"
        percent
        isNumeric
        integer
        placeholder="0"
        label="Protocol Fee"
        sx={{ maxWidth: 240 }}
      />
      <BorderedBox
        p={2}
        spacing={1}
        sx={{
          position: 'relative',
          borderColor: feeInvalid ? COLOR_RED : COLOR_STROKE,
        }}
      >
        <Stack direction={{ md: 'row' }} spacing={1}>
          <CustomInputHookForm
            fieldName="entityFees.dao"
            isNumeric
            percent
            placeholder="0"
            integer
            label="DAO Treasury"
          />
          <CustomInputHookForm
            fieldName="entityFees.operators"
            percent
            isNumeric
            placeholder="0"
            integer
            label="Validators reward"
          />
          <CustomInputHookForm
            fieldName="entityFees.instantPool"
            percent
            isNumeric
            placeholder="0"
            integer
            label="Instant Rewards"
          />
          <CustomInputHookForm
            fieldName="entityFees.staking"
            percent
            isNumeric
            placeholder="0"
            integer
            label="Real Yield Staking rewards"
          />
        </Stack>
        <InputMessageStyle $hidden={!feeInvalid}>
          {getMaxSumErrorMessage(MAX_FEE_TOTAL, true)}
        </InputMessageStyle>
        <EditButtonGroupHookForm
          shouldTriggerValidation
          isDisabled={feeInvalid}
          fieldName="entityFees"
          hidden={false}
        />
      </BorderedBox>
    </Stack>
  );
};
