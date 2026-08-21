import { useController } from 'react-hook-form';
import { CustomInput, InfoText } from 'shared/components';
import { isValidationErrorTypeValidate } from 'shared/hook-form/validation';

export const RewardPerSecondInput = () => {
  const {
    field,
    fieldState: { error },
  } = useController({ name: 'rewardPerSecond' });
  const hasErrorHighlight = isValidationErrorTypeValidate(error?.type);

  return (
    <CustomInput
      {...field}
      isNumeric
      label="Reward per second"
      isEditable
      error={hasErrorHighlight}
      helperText={<InfoText text="value must be >0" />}
      sx={{ width: 262 }}
    />
  );
};
