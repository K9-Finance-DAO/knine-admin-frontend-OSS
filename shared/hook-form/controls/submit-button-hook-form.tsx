import { useWeb3 } from 'rnb-web3/web3-react';
import { useFormState } from 'react-hook-form';

import { Connect } from 'shared/wallet';
import { isValidationErrorTypeValidate } from '../validation';
import { Button, ButtonProps } from '@mui/material';
import { ButtonContentStyle } from './styles';
import { ButtonLoaderStyle } from 'shared/components';

export type SubmitButtonHookFormProps = {
  errorField?: string;
  isLocked?: boolean;
  loading?: boolean;
  disableIfFormInvalid?: boolean;
} & ButtonProps;

export const SubmitButtonHookForm = ({
  isLocked,
  errorField,
  disabled: disabledProp,
  children,
  loading,
  disableIfFormInvalid = false,
  variant = 'contained',
  color = 'secondary',
  ...props
}: SubmitButtonHookFormProps) => {
  const { active } = useWeb3();
  const { isValidating, isSubmitting, isValid } = useFormState();
  const { errors } = useFormState<Record<string, unknown>>();

  const disabled =
    (errorField &&
      !!errors[errorField] &&
      isValidationErrorTypeValidate(errors[errorField]?.type)) ||
    disabledProp;

  if (!active) return <Connect color="primary" fullWidth />;

  const isLoading = isValidating || isSubmitting || loading;

  return (
    <Button
      fullWidth
      variant={variant}
      color={color}
      type="submit"
      disabled={
        disabled || isLoading || (disableIfFormInvalid ? !isValid : false)
      }
      {...props}
      sx={{
        ...props?.sx,
      }}
    >
      <ButtonContentStyle
        variant="button"
        $disabled={disabled}
        $hidden={isLoading}
      >
        {children}
      </ButtonContentStyle>
      {isLoading && <ButtonLoaderStyle size="small" />}
    </Button>
  );
};
