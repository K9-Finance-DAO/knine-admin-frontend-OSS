import { ComponentsOverrides, Theme } from '@mui/material';

export const getMuiDividerOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiDivider'] => ({
  root: {
    background: theme.palette.colorScheme.white,

    '&.stroke': {
      background: theme.palette.colorScheme.stroke,
      opacity: '1',
    },

    opacity: '0.47',
    '&.fullWidth': {
      width: '100%',
    },
    '&.secondary': {},
  },
});
