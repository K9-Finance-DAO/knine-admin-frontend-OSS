import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { BigNumber } from 'ethers';

import { formatEther, parseEther } from '@ethersproject/units';
import { MaxUint256 } from '@ethersproject/constants';
import { InputAdornment, TextFieldProps, Typography } from '@mui/material';

import { normalizeDecimalValue } from 'utils/normilizeDecimalValue';
import { InputMessageStyle, InputStyles } from './styles';
import { Icons } from 'shared/components/index';

export const InputForwardRef = forwardRef(
  (props: TextFieldProps, ref?: ForwardedRef<HTMLElement>) => {
    return <InputStyles {...props} inputRef={ref} />;
  },
);

InputForwardRef.displayName = 'InputForwardRef';

export type InputAmountProps = {
  onChange?: (value: BigNumber | null) => void;
  error?: ReactNode | boolean;
  value?: BigNumber | null;
  rightDecorator?: ReactNode;
  tokenSymbol?: string;
  percent?: boolean;
  warning?: ReactNode;
} & Omit<TextFieldProps, 'onChange' | 'value' | 'error'>;

const parseEtherSafe = (value: string) => {
  try {
    return parseEther(value);
  } catch {
    return null;
  }
};

export const InputAmount = forwardRef<HTMLInputElement, InputAmountProps>(
  (
    {
      onChange,
      value,
      rightDecorator,
      placeholder = '0.00',
      warning,
      error,
      tokenSymbol,
      percent,
      ...props
    },
    ref,
  ) => {
    const hasErrorMessage = !!error && typeof error !== 'boolean';
    const hasWarningMessage = !!warning && typeof warning === 'string';
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const defaultValue = useMemo(() => (value ? formatEther(value) : ''), []);
    const lastInputValue = useRef(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return inputRef.current!;
      },
      [],
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        // will accumulate changes without committing to dom
        let currentValue = e.currentTarget.value;
        const immutableValue = e.currentTarget.value;
        const caretPosition = e.currentTarget.selectionStart ?? 0;

        currentValue = normalizeDecimalValue(currentValue.trim());

        if (currentValue === '') {
          onChange?.(null);
        } else {
          const value = parseEtherSafe(currentValue);
          // invalid value, so we rollback to last valid value
          if (!value) {
            const rollbackCaretPosition =
              caretPosition -
              Math.min(
                e.currentTarget.value.length - lastInputValue.current.length,
              );

            // rollback value (caret moves to end)
            e.currentTarget.value = lastInputValue.current;
            // rollback caret
            e.currentTarget.setSelectionRange(
              rollbackCaretPosition,
              rollbackCaretPosition,
            );
            return;
          }
          const isGreaterThanMaxUint256 = value.gt(MaxUint256);

          const cappedValue = isGreaterThanMaxUint256 ? MaxUint256 : value;

          if (isGreaterThanMaxUint256) {
            currentValue = formatEther(MaxUint256);
          }
          onChange?.(cappedValue);
        }

        // commit change to dom
        e.currentTarget.value = currentValue;
        // if there is a diff due to soft change, adjust caret to remain in same place
        if (currentValue != immutableValue) {
          const rollbackCaretPosition =
            caretPosition -
            Math.min(immutableValue.length - currentValue.length);
          e.currentTarget.setSelectionRange(
            rollbackCaretPosition,
            rollbackCaretPosition,
          );
        }
        lastInputValue.current = currentValue;
      },
      [onChange],
    );

    useEffect(() => {
      const input = inputRef.current;
      if (!input) return;
      if (!value) {
        input.value = '';
      } else {
        const parsedValue = parseEtherSafe(input.value);
        // only change string state if casted values differ
        // this allows user to enter 0.100 without immediate change to 0.1
        if (!parsedValue || !parsedValue.eq(value)) {
          input.value = formatEther(value);
          // prevents rollback to incorrect value in onChange
          lastInputValue.current = input.value;
        }
      }
    }, [value]);

    return (
      <InputForwardRef
        fullWidth
        label="Amount"
        inputMode="decimal"
        placeholder={placeholder}
        ref={inputRef}
        onChange={handleChange}
        defaultValue={defaultValue}
        error={!!error}
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                ml: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {tokenSymbol && <Typography>{tokenSymbol}</Typography>}
              {percent && <Icons.Percent />}
              {rightDecorator || null}
            </InputAdornment>
          ),
        }}
        helperText={
          <>
            {props.helperText}
            <InputMessageStyle
              $hidden={!hasErrorMessage && !hasWarningMessage}
              $warning={hasWarningMessage}
            >
              {error || warning}
            </InputMessageStyle>
          </>
        }
        sx={{
          ...props?.sx,
        }}
      />
    );
  },
);
