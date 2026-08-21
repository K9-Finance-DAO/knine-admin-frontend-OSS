import { inputLabelClasses, styled, TextField } from '@mui/material';

const INPUT_WITH_ADORNMENT_POSITION = {
  position: 'relative',
  top: 10,
};

export const CustomInputStyled = styled(TextField)(({ theme }) => ({
  input: {
    ...INPUT_WITH_ADORNMENT_POSITION,
    padding: `${theme.spacing(1.5)} !important`,
  },
  '& .MuiInputBase-root': {
    height: 68,
  },
  '& .MuiInputAdornment-root': {
    ...INPUT_WITH_ADORNMENT_POSITION,
  },
  [`& .${inputLabelClasses.root}`]: {
    fontSize: 14,
    color: theme.palette.colorScheme.gray,
    textTransform: 'none',
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.colorScheme.gray,
  },
}));
