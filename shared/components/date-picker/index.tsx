import { inputLabelClasses, styled } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FontWeights } from 'styles';

const INPUT_WITH_ADORNMENT_POSITION = {
  position: 'relative',
  top: 10,
};

export const DatePickerStyled = styled(DateTimePicker)(({ theme }) => ({
  input: {
    ...INPUT_WITH_ADORNMENT_POSITION,
    padding: theme.spacing(1.5),
  },

  '&.MuiFormControl-root': {
    width: 212,
  },

  '& .MuiInputBase-root': {
    height: 68,
  },

  '& .MuiInputBase-input': {
    color: theme.palette.colorScheme.light,
    padding: '0 11px',

    '&::placeholder': {
      color: theme.palette.colorScheme.light,
    },
  },

  '& .MuiInputAdornment-root': {
    ...INPUT_WITH_ADORNMENT_POSITION,
    right: 10,
    display: 'inline-flex',
    alignItems: 'center',
    fill: theme.palette.colorScheme.orangeMid,

    button: {
      padding: 0,
      background: 'transparent',
    },
  },

  [`& .${inputLabelClasses.root}`]: {
    fontSize: 14,
    fontWeight: FontWeights.Medium,
    textTransform: 'none',
  },
}));

export const FormDatePickerRangeSpacer = styled('span')(({ theme }) => ({
  width: 16,
  height: 1,
  borderBottom: `1px solid ${theme.palette.colorScheme.stroke}`,
}));
