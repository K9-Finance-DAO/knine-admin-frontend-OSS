import {
  alpha,
  ComponentsOverrides,
  ComponentsProps,
  iconButtonClasses,
  Theme,
} from '@mui/material';
import { TRANSITION_DEFAULT_TIME } from '../constants';

export const getMuiIconButtonOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiIconButton'] => ({
  root: {
    padding: '4px',
    background: theme.palette.colorScheme.stroke,
    borderRadius: '50%',

    '&:hover': {
      background: theme.palette.colorScheme.blueDeepIndigo,
    },

    '&.transparent': {
      background: 'transparent',
    },

    '&.noPadding': {
      padding: '0px',
    },

    '&.clear': {
      background: 'rgba(255, 255, 255, 0.26)',
    },

    [`&.${iconButtonClasses.disabled}`]: {
      background: alpha(theme.palette.colorScheme.stroke, 0.8),

      '&.transparent': {
        background: 'transparent',
        opacity: 0.5,
      },
    },

    svg: {
      color: theme.palette.colorScheme.graySecondary,
      transition: TRANSITION_DEFAULT_TIME,
    },

    '&.accent': {
      backgroundColor: theme.palette.colorScheme.brown,

      '&:hover': {
        backgroundColor: theme.palette.colorScheme.brown,
      },
    },
  },
});

export const getMuiIconButtonDefaultProps =
  (): ComponentsProps['MuiIconButton'] => ({
    disableFocusRipple: true,
    disableRipple: true,
  });
