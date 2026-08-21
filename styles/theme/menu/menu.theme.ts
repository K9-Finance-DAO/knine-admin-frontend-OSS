import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { BORDER_RADIUS_S } from '../constants';

export const getMuiMenuOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiMenu'] => ({
  paper: {
    backgroundColor: theme.palette.colorScheme.stroke,
    border: 'none',
    borderRadius: BORDER_RADIUS_S,
    marginTop: theme.spacing(1),
  },
  list: {
    padding: '8px',
    height: 'auto',
  },
});

export const getMuiMenuItemOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiMenuItem'] => ({
  root: {
    color: theme.palette.colorScheme.white,
    borderRadius: '4px',
    minHeight: '40px !important',
    padding: theme.spacing(0.5, 0.75),
    '&:focus-visible': {
      background: theme.palette.colorScheme.blueDeepIndigo,
    },

    '& + &': {
      marginTop: theme.spacing(0.5),
    },
    '&:hover': {
      background: theme.palette.colorScheme.blueDeepIndigo,
    },

    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },

    '&.Mui-selected': {
      backgroundColor: theme.palette.colorScheme.blueDeepIndigo,

      '&:hover': {
        background: theme.palette.colorScheme.blueDeepIndigo,
      },
    },
  },
});

export const getMuiMenuItemDefaultProps =
  (): ComponentsProps['MuiMenuItem'] => ({
    disableRipple: true,
  });
