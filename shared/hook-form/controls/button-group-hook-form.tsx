import { Button, Stack, StackProps } from '@mui/material';
import { BigNumber } from 'ethers';
import { useController, useFormContext, useFormState } from 'react-hook-form';
import { useFormControllerContext } from 'shared/hook-form/form-controller';

type InputActionsProps = {
  fieldName: string;
  hidden?: boolean;
  onCancel?: () => void;
  isDisabled?: boolean;
  shouldTriggerValidation?: boolean;
} & StackProps;

export const EditButtonGroupHookForm = ({
  fieldName,
  hidden = true,
  onCancel,
  isDisabled = false,
  shouldTriggerValidation = false,
  ...rest
}: InputActionsProps) => {
  const { resetField: handleResetField, trigger } = useFormContext();
  const { onSave } = useFormControllerContext();
  const { defaultValues, disabled } = useFormState<Record<string, unknown>>({
    name: fieldName,
  });
  const { field, fieldState } = useController({ name: fieldName });

  const handleCancel = async () => {
    const resetField = defaultValues?.[fieldName];
    if (
      resetField &&
      !BigNumber.isBigNumber(resetField) &&
      typeof resetField === 'object' &&
      !Array.isArray(resetField)
    ) {
      Object.keys(resetField).forEach((key) =>
        handleResetField(`${fieldName}.${key}`),
      );
    } else {
      handleResetField(fieldName);
    }

    if (shouldTriggerValidation) {
      await trigger(fieldName);
    }

    onCancel?.();
  };

  const handleSave = () => {
    try {
      onSave?.(field);
    } catch (err) {
      console.error('handleSave', `Error saving ${field.name}`);
    }
  };

  return (
    <Stack
      direction="row"
      mt={1}
      spacing={1}
      {...rest}
      display={hidden ? 'none' : 'flex'}
    >
      <Button
        onClick={handleSave}
        disabled={fieldState.invalid || disabled || isDisabled}
        className="admin-form"
      >
        Save
      </Button>
      <Button className="admin-form" disabled={disabled} onClick={handleCancel}>
        Cancel
      </Button>
    </Stack>
  );
};
