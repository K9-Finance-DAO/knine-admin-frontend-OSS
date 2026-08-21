import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { FontWeights } from '../typography';

export const getMuiToggleButtonGroupOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiToggleButtonGroup'] => ({
  root: {
    padding: theme.spacing(0.25),
    width: 'min-content',
    gap: '5px',
    background: theme.palette.colorScheme.black,
    border: 'none',
  },
});

export const getMuiToggleButtonGroupDefaultProps =
  (): ComponentsProps['MuiToggleButtonGroup'] => ({
    exclusive: true,
  });

export const getMuiToggleButtonOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiToggleButton'] => ({
  root: {
    width: 60,
    height: 20,
    fontSize: 10,
    lineHeight: '16px',
    fontWeight: FontWeights.SemiBold,
    background: 'transparent',
    border: 'none',
    borderRadius: '6px !important',
    '&.Mui-disabled': {
      color: theme.palette.colorScheme.base,
      opacity: 0.5,
    },

    '&:hover': {
      outline: `1px solid ${theme.palette.colorScheme.stroke}`,
    },

    '&.Mui-selected': {
      color: theme.palette.colorScheme.stroke,
      background: theme.palette.colorScheme.greenShamrock,
      outline: `none`,

      '&:hover': {
        background: theme.palette.colorScheme.greenShamrock,
      },

      '&.danger': {
        background: theme.palette.colorScheme.danger,
        color: theme.palette.colorScheme.light,
      },
    },
  },
});

export const getMuiToggleButtonDefaultProps =
  (): ComponentsProps['MuiToggleButton'] => ({
    disableRipple: true,
  });
