import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiLinkOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiLink'] => ({
  root: {
    textDecoration: 'none',
    color: theme.palette.colorScheme.light,

    '&.secondary': {
      color: theme.palette.colorScheme.mid,
    },

    '&.accent': {
      color: theme.palette.colorScheme.orangeBase,
    },

    '&.underline': {
      textDecoration: 'underline',
    },
  },
});

export const getMuiLinkDefaultProps = (): ComponentsProps['MuiLink'] => ({});
