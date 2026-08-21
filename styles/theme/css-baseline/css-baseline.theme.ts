import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import {
  COLOR_BLUE,
  COLOR_BROWN,
  COLOR_DARK_GREEN,
  COLOR_GREEN_SHAMROCK,
  COLOR_INFO,
  COLOR_ORANGE_BASE,
  COLOR_WH,
  COLOR_WINE,
} from 'styles/theme/constants';
import { FontFamilies } from '../typography';

export const getMuiCssBaselineOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiCssBaseline'] => ({
  '*::-webkit-scrollbar': {
    width: 6,
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.colorScheme.gray,
    borderRadius: 20,
  },
  html: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    boxSizing: 'border-box',
    background: theme.palette.colorScheme.backgroundBase,
  },

  '*': {
    margin: 0,
    padding: 0,
  },

  body: {
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'overlay',
    margin: 0,
    fontFamily: FontFamilies.primary,
    fontSize: 14,
    background: theme.palette.colorScheme.backgroundBase,

    'span, div': {
      fontFeatureSettings: 'liga off',
    },
  },

  a: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.colorScheme.light,

    '&.underline': {
      textDecoration: 'underline',
    },

    '&:focus-visible': {
      outline: `1px solid ${theme.palette.colorScheme.gray}`,
    },
  },

  '.Toastify__toast': {
    minHeight: '56px !important',
    border: '1px solid !important',
    borderRadius: '12px !important',
    fontWeight: '400 !important',
    wordBreak: 'break-word',
    marginBottom: 0,
    color: `${theme.palette.colorScheme.white} !important`,
    backgroundColor: theme.palette.colorScheme.backgroundBase,
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1.25),
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(1),
    },

    svg: {
      boxSizing: 'content-box',
      width: '22px !important',
    },

    '&-body': {
      padding: '0 !important',
    },
    '&-icon': {
      width: '20px !important',
    },

    '&--success': {
      borderColor: `${COLOR_GREEN_SHAMROCK} !important`,
      backgroundColor: `${COLOR_DARK_GREEN} !important`,

      '.Toastify__toast-icon svg': {
        fill: `${COLOR_WH} !important`,
      },
      '.Toastify__close-button': {
        color: `${COLOR_WH} !important`,
      },
    },
    '&--info': {
      borderColor: `${COLOR_BLUE} !important`,
      backgroundColor: `${COLOR_INFO} !important`,

      '.Toastify__toast-icon svg': {
        fill: `${COLOR_WH} !important`,
      },
      '.Toastify__close-button': {
        color: `${COLOR_WH} !important`,
      },
    },
    '&--warning': {
      borderColor: `${COLOR_ORANGE_BASE} !important`,
      backgroundColor: `${COLOR_BROWN} !important`,

      '.Toastify__toast-icon svg': {
        fill: COLOR_WH,
      },
      '.Toastify__close-button': {
        color: `${COLOR_WH} !important`,
      },
    },
    '&--error': {
      borderColor: `#DF1C41 !important`,
      backgroundColor: `${COLOR_WINE} !important`,

      '.Toastify__toast-icon svg': {
        fill: COLOR_WH,
      },
      '.Toastify__close-button': {
        color: `${COLOR_WH} !important`,
      },
    },
    '&--default': {
      borderColor: 'rgba(94, 153, 245, 1) !important',
      color: 'rgba(94, 153, 245, 1) !important',

      '.Toastify__close-button': {
        color: 'rgba(94, 153, 245, 1) !important',
      },
    },
  },

  '.Toastify__close-button': {
    alignSelf: 'center !important',
    width: '25px !important',
    height: '25px !important',
    opacity: 1,
  },
});

export const getMuiCssBaselineDefaultProps =
  (): ComponentsProps['MuiCssBaseline'] => ({});
