import { Icons } from 'shared/components';
import { useController, useFormContext } from 'react-hook-form';
import { DatePickerStyled } from 'shared/components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import type { DateTimePickerProps } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { InputMessageStyle } from 'shared/components/input-amount';
import { fromUnixTime } from 'date-fns';

interface FormDatePickerProps {
  fieldName: string;
  dependedFieldName?: string;
  label: string;
  useUtc?: boolean;
}

const convertToUTCDate = (timestamp: number) => {
  const date = fromUnixTime(timestamp / 1000);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
};

export const FormDatePicker = ({
  fieldName,
  dependedFieldName,
  label,
  useUtc = false,
  ...datePickerProps
}: FormDatePickerProps & DateTimePickerProps<Date, boolean>) => {
  const { trigger } = useFormContext();
  const { field, fieldState } = useController({
    name: fieldName,
    defaultValue: null,
  });

  const errorMessage = fieldState.error?.message;

  const { onChange, value, ...rest } = field;

  const handleAccept = async (value: Date | null) => {
    if (value) {
      onChange(value);
      dependedFieldName ? await trigger(dependedFieldName) : undefined;
    }
  };

  const datePickerValue = value
    ? useUtc
      ? convertToUTCDate(value)
      : value
    : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerStyled
        label={label}
        format="dd.MM.yyyy HH:mm"
        ampm={false}
        closeOnSelect
        slots={{
          openPickerIcon: Icons.Calendar,
        }}
        {...rest}
        slotProps={{
          textField: {
            error: !!errorMessage,
            helperText: (
              <InputMessageStyle $hidden={!errorMessage}>
                {errorMessage}
              </InputMessageStyle>
            ),
          },
        }}
        value={datePickerValue}
        onAccept={handleAccept}
        {...datePickerProps}
      />
    </LocalizationProvider>
  );
};
