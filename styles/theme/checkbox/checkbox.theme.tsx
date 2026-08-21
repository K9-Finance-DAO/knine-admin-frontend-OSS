import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { Checkbox } from 'shared/components/icons/checkbox';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiCheckbox = (
  theme: Theme,
): ComponentsOverrides['MuiCheckbox'] => {
  const colorCommon = {
    background: theme.palette.colorScheme.darkSecondary,
    border: `2px solid ${theme.palette.colorScheme.stroke}`,
    color: 'transparent',
    '&:hover': {
      borderColor: theme.palette.colorScheme.orangeMid,
      background: theme.palette.colorScheme.backgroundBase,
    },
    '&, &:hover, &:focus, &:active': {
      opacity: 1,
    },
    '&.Mui-checked': {
      border: 0,
      background: theme.palette.colorScheme.orangeMid,
      '&:hover': {
        background: theme.palette.colorScheme.orangeLight,
      },
    },
  };
  return {
    root: {
      margin: '3px !important',
      padding: 0,
      height: 18,
      width: 18,
      borderRadius: 6,
      borderWidth: 2,
      borderStyle: 'solid',
      overflow: 'hidden',

      '.MuiFormControlLabel-root': {
        cursor: 'default',
      },
    },
    colorPrimary: colorCommon,
    colorSecondary: colorCommon,
  };
};

export const getMuiCheckboxDefaultProps =
  (): ComponentsProps['MuiCheckbox'] => ({
    checkedIcon: <Checkbox />,
    color: 'primary',
    disableRipple: true,
  });
