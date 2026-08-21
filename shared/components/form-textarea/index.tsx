import { Box, TextareaAutosizeProps, Typography } from '@mui/material';
import { FormTextarea as FormTextareaStyled } from './styles';
import { useController } from 'react-hook-form';
import { InputMessageStyle } from 'shared/components/input-amount';

type FormTextareaProps = {
  label: string;
  fieldName: string;
};

export const FormTextarea = ({
  label,
  fieldName,
  ...textareaProps
}: FormTextareaProps & TextareaAutosizeProps) => {
  const { field, fieldState } = useController({ name: fieldName });
  const errorMessage = fieldState.error?.message;

  return (
    <Box>
      {label && (
        <Typography variant="body1" className="gray-secondary" mb={0.5}>
          {label}
        </Typography>
      )}

      <Box position="relative">
        <FormTextareaStyled
          {...field}
          $error={!!fieldState?.error?.message}
          {...textareaProps}
        />
        <InputMessageStyle $hidden={!errorMessage}>
          {errorMessage}
        </InputMessageStyle>
      </Box>
    </Box>
  );
};
