import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

export const getMuiContainerOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiContainer'] => ({
  root: {
    padding: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0),
    },
  },
});

export const getMuiContainerDefaultProps =
  (): ComponentsProps['MuiContainer'] => ({
    maxWidth: false,
    sx: {
      mx: 'auto',
    },
  });
