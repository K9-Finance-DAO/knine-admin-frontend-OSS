import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { COLOR_DARK_SECONDARY, COLOR_STROKE } from '../constants';

export const getMuiDrawerOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiDrawer'] => ({
  root: {
    zIndex: 10,
    height: '100vh',
    overflowX: 'visible',
    background: 'rgba(11, 12, 17, 0.74)',
  },
  paper: {
    width: 272,
    padding: theme.spacing(2.5),
    background: COLOR_DARK_SECONDARY,
    borderRight: `1px solid ${COLOR_STROKE}`,
  },
});

export const getMuiDrawerDefaultProps = (): ComponentsProps['MuiDrawer'] => ({
  hideBackdrop: true,
});
