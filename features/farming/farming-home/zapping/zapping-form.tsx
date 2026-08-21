import { Button, Stack, Typography } from '@mui/material';
import { BorderedBox } from 'shared/components';
import { CustomInputHookForm } from 'shared/hook-form/controls';
import { ZapFeesFormProvider } from './form-context';
import { FormController } from 'shared/hook-form/form-controller';
import { useFormContext, useFormState } from 'react-hook-form';

const Form = () => {
  const { defaultValues, disabled } = useFormState();
  const { reset } = useFormContext();

  const handleCancel = () => reset(defaultValues);
  return (
    <FormController>
      <Stack direction="row" spacing={1}>
        <CustomInputHookForm
          fieldName="zapEntryFee"
          isNumeric
          percent
          integer
          label="Zap Entry Fee"
          placeholder="0"
        />
        <CustomInputHookForm
          fieldName="zapExitFee"
          percent
          isNumeric
          placeholder="0"
          integer
          label="Zap Exit Fee"
        />
      </Stack>
      <Stack direction="row" mt={1} spacing={1}>
        <Button disabled={disabled} className="admin-form" type="submit">
          Save
        </Button>
        <Button
          onClick={handleCancel}
          disabled={disabled}
          className="admin-form"
        >
          Cancel
        </Button>
      </Stack>
    </FormController>
  );
};

export const ZappingForm = () => {
  return (
    <Stack spacing={2}>
      <Typography className="medium gray-secondary">Zapping fees</Typography>

      <BorderedBox p={2} spacing={1} maxWidth={435}>
        <ZapFeesFormProvider>
          <Form />
        </ZapFeesFormProvider>
      </BorderedBox>
    </Stack>
  );
};
