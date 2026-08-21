import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import {
  BACKGROUND_BASE,
  COLOR_GRAY,
  COLOR_LIGHT,
  COLOR_ORANGE_BASE,
  COLOR_STROKE,
} from '../constants';

export const getMuiTabsOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiTabs'] => ({
  root: {
    paddingY: theme.spacing(1.75),

    '&.rounded': {
      padding: theme.spacing(0.5),
      minHeight: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: BACKGROUND_BASE,

      '.MuiTabs-flexContainer': {
        paddingLeft: 0,
        gap: theme.spacing(0.5),
        border: 'none',
      },

      '.MuiTabs-indicator': {
        display: 'none',
      },

      '.MuiTab-root': {
        padding: 0,
        display: 'flex',
        flex: 1,
        minHeight: 28,
        maxWidth: '100%',
        border: '1.5px solid',
        borderColor: 'transparent',
        borderRadius: 6,

        '&:focus-visible': {
          borderBottom: `1.5px solid ${COLOR_ORANGE_BASE} !important`,
        },

        '&:hover': {
          borderColor: COLOR_STROKE,
          color: COLOR_LIGHT,
        },

        '&.Mui-selected': {
          backgroundColor: COLOR_STROKE,
          borderColor: 'transparent',
        },
      },
    },
  },
  flexContainer: {
    paddingLeft: theme.spacing(2),
    gap: theme.spacing(3),
    borderBottom: `1.5px solid ${COLOR_STROKE}`,
  },
  indicator: {
    backgroundColor: COLOR_ORANGE_BASE,
  },
});

export const getMuiTabsDefaultProps = (): ComponentsProps['MuiTabs'] => ({});

export const getMuiTabOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiTab'] => ({
  root: {
    padding: theme.spacing(0),
    minWidth: 0,
    minHeight: 48,
    color: COLOR_GRAY,
    lineHeight: '20px',
    textTransform: 'none',

    '&:focus-visible': {
      borderBottom: `1.5px solid ${COLOR_ORANGE_BASE}`,
    },

    '&.Mui-selected': {
      color: COLOR_LIGHT,
    },
  },
});

export const getMuiTabDefaultProps = (): ComponentsProps['MuiTab'] => ({
  disableRipple: true,
});
