import { forwardRef } from 'react';

import { useController } from 'react-hook-form';
import { Input, type InputProps } from 'shared/components';

export type CustomInputHookFormProps = {
  fieldName: string;
} & InputProps;

export const CustomInputHookForm = forwardRef<
  HTMLInputElement,
  CustomInputHookFormProps
>(({ fieldName, error: errorProp, isNumeric, ...props }, ref) => {
  const { field, fieldState } = useController({ name: fieldName });
  const errorMessage = fieldState.error?.message;
  return (
    <Input
      {...props}
      {...field}
      isNumeric={isNumeric}
      error={errorProp ?? errorMessage}
      ref={ref}
    />
  );
});

CustomInputHookForm.displayName = 'CustomInputHookForm';
