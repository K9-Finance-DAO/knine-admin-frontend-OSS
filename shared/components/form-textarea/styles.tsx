import { TextareaAutosize, styled } from '@mui/material';
import { BORDER_RADIUS_M, FontFamilies } from 'styles';

export const FormTextarea = styled(TextareaAutosize, {
  shouldForwardProp: (prop) => prop !== '$error',
})<{ $error: boolean }>(({ theme, $error }) => ({
  width: '100%',
  fontFamily: FontFamilies.primary,
  borderRadius: BORDER_RADIUS_M,
  color: theme.palette.colorScheme.graySecondary,
  backgroundColor: theme.palette.colorScheme.black,
  border: `1.5px solid`,
  borderColor: $error
    ? theme.palette.colorScheme.red
    : theme.palette.colorScheme.stroke,
  padding: theme.spacing(1.5),
  resize: 'vertical',
  outline: 'none',

  '&:hover': {
    borderColor: theme.palette.colorScheme.base,
  },

  '&::placeholder': {
    color: theme.palette.colorScheme.graySecondary,
  },
}));
