import { useController } from 'react-hook-form';
import { CustomInput, InfoText } from 'shared/components';
import { isValidationErrorTypeValidate } from 'shared/hook-form/validation';

export const MaxLockupMultiplierInput = () => {
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'multiplier' });
  const hasErrorHighlight = isValidationErrorTypeValidate(error?.type);

  return (
    <CustomInput
      {...field}
      isNumeric
      label="Max lockup multiplier"
      isEditable
      error={hasErrorHighlight}
      helperText={<InfoText text="value must be >1" />}
      sx={{ width: 262 }}
    />
  );
};
