import {
  BreakpointsOptions,
  ComponentsOverrides,
  ComponentsProps,
} from '@mui/material';

export const breakpointOptions: BreakpointsOptions = {
  values: {
    xxs: 0,
    xs: 325,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1420,
  },
};

export const getMuiGridOverrides = (): ComponentsOverrides['MuiGrid'] => ({});

export const getMuiGridDefaultProps = (): ComponentsProps['MuiGrid'] => ({
  xs: 'auto',
});
