import {
  InputAdornment,
  Stack,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { Icons } from '..';
import { ChangeEvent, forwardRef, ReactNode } from 'react';
import { CustomInputStyled } from '../custom-input/styles';
import { InputMessageStyle } from '../input-amount';
import { validateOnlyNumbers } from 'utils';

export type InputProps = {
  percent?: boolean;
  isNumeric?: boolean;
  integer?: boolean;
  showErrorMessage?: boolean;
  tokenSymbol?: string;
  rightDecorator?: ReactNode;
  error?: ReactNode;
} & Omit<TextFieldProps, 'error' | 'ref'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      percent,
      tokenSymbol,
      isNumeric,
      rightDecorator,
      error,
      onChange,
      integer,
      ...rest
    },
    ref,
  ) => {
    const hasErrorMessage = !!error && typeof error !== 'boolean';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (value === '' || !isNumeric) {
        onChange?.(e);
      }

      if (
        isNumeric &&
        validateOnlyNumbers({
          value: value,
          isInteger: integer,
          allowEmpty: true,
        })
      ) {
        onChange?.(e);
      }
    };

    return (
      <CustomInputStyled
        {...rest}
        value={rest?.value ?? ''}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Stack direction="row" spacing={1}>
                {tokenSymbol && <Typography>{tokenSymbol}</Typography>}
                {percent && <Icons.Percent />}
                {rightDecorator ?? null}
              </Stack>
            </InputAdornment>
          ),
        }}
        helperText={
          <>
            {rest.helperText}
            <InputMessageStyle $hidden={!hasErrorMessage}>
              {error}
            </InputMessageStyle>
          </>
        }
        error={!!error}
        ref={ref}
      />
    );
  },
);

Input.displayName = 'Input';
