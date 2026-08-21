import { styled, TextField, inputLabelClasses } from '@mui/material';

export const InputMessageStyle = styled('span', {
  shouldForwardProp: (propName) =>
    propName !== '$hidden' && propName !== '$warning',
})<{
  $hidden?: boolean;
  $warning?: boolean;
}>(({ theme, $hidden, $warning }) => {
  const backgroundMessage = $warning
    ? theme.palette.colorScheme.brown
    : theme.palette.colorScheme.wine;

  return {
    position: 'absolute',
    display: $hidden ? 'none' : 'inline',
    left: '0px',
    bottom: 'calc(100% + 4px)',
    padding: theme.spacing(0.75, 1),
    maxWidth: '100%',
    background: backgroundMessage,
    color: theme.palette.colorScheme.light,
    fontSize: theme.typography.body1.fontSize,
    borderRadius: '6px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    zIndex: 4,
  };
});

const INPUT_WITH_ADORNMENT_POSITION = {
  position: 'relative',
  top: 10,
};

export const InputStyles = styled(TextField)(({ theme }) => ({
  input: {
    ...INPUT_WITH_ADORNMENT_POSITION,
    padding: theme.spacing(1.5),
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
