import { useController } from 'react-hook-form';

import { InputAmount } from 'shared/components/input-amount';

import { isValidationErrorTypeValidate } from 'shared/hook-form/validation';
import { ComponentProps } from 'react';

export type TokenAmountInputHookFormProps = Partial<
  ComponentProps<typeof InputAmount>
> & {
  fieldName: string;
  showErrorMessage?: boolean;
};

export const TokenAmountInputHookForm = ({
  fieldName,
  showErrorMessage = true,
  error: errorProp,
  ...props
}: TokenAmountInputHookFormProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name: fieldName });
  const hasErrorHighlight = isValidationErrorTypeValidate(error?.type);
  // allows to show error state without message
  const errorMessage = hasErrorHighlight && (error?.message || true);
  return (
    <InputAmount
      {...props}
      {...field}
      disabled={props.disabled ?? field.disabled}
      error={errorProp ?? (showErrorMessage ? errorMessage : hasErrorHighlight)}
      fullWidth
    />
  );
};
