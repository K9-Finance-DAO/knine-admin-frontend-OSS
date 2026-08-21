import {
  alpha,
  ComponentsOverrides,
  ComponentsProps,
  inputBaseClasses,
  inputLabelClasses,
  outlinedInputClasses,
  Theme,
} from '@mui/material';
import {
  BORDER_RADIUS_L,
  COLOR_BASE,
  COLOR_BLACK,
  COLOR_LIGHT,
  COLOR_ORANGE_MID,
  COLOR_STROKE,
} from '../constants';
import { FontFamilies, FontWeights } from '../typography';

const TEXTFIELD_BORDER = '1.5px solid';

export const textfieldStyles = {
  root: {
    fontFamily: FontFamilies.primary,
    width: '100%',
    background: COLOR_BLACK,
    fontSize: '16px',
    color: COLOR_LIGHT,
    borderRadius: BORDER_RADIUS_L,
    caretColor: COLOR_ORANGE_MID,
    border: TEXTFIELD_BORDER,
    borderColor: COLOR_STROKE,
    boxShadow: 'none',
    overflow: 'hidden',

    '&:hover': {
      background: COLOR_BLACK,
      borderColor: COLOR_BASE,
    },

    '& fieldset': { border: 'none' },
  },
  focused: {
    border: TEXTFIELD_BORDER,
    borderColor: COLOR_BASE,
    background: COLOR_BLACK,
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiTextFieldOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiTextField'] => ({
  root: {
    width: '100%',
    '& input::placeholder': {
      opacity: 1,
      color: theme.palette.colorScheme.stroke,
      fontWeight: FontWeights.Regular,
    },

    [`& .${inputBaseClasses.input}`]: {
      padding: theme.spacing(2),
      fontSize: '16px',
      fontFamily: FontFamilies.primary,
    },

    [`& .${outlinedInputClasses.input}`]: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
      },

      [`&.${inputBaseClasses.disabled}`]: {
        '& + fieldset': {
          borderColor: `${theme.palette.colorScheme.blueDeepIndigo} !important`,
        },
      },
    },
    [`& .${outlinedInputClasses.root}`]: {
      height: '100%',

      ...textfieldStyles.root,

      [`&.${outlinedInputClasses.error}`]: {
        color: theme.palette.colorScheme.red,
        borderColor: `${theme.palette.colorScheme.red} !important`,
      },

      [`&.${inputBaseClasses.focused}`]: {
        ...textfieldStyles.focused,
      },

      [`&.${inputBaseClasses.disabled}`]: {
        borderColor: theme.palette.colorScheme.stroke,
        background: alpha(theme.palette.colorScheme.black, 0.5),
      },

      [`& .${inputBaseClasses.input}.${inputBaseClasses.disabled}`]: {
        WebkitTextFillColor: alpha(theme.palette.colorScheme.white, 0.7),
      },
      [`& .${inputBaseClasses.disabled}`]: {
        opacity: 0.5,
      },
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.colorScheme.stroke,
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      fontSize: '16px',
    },

    '& fieldset': { border: 'none' },

    [`& .${inputLabelClasses.root}`]: {
      transform: 'translate(13px, 8px)',
      fontSize: '13px',
      lineHeight: '20px',
      color: theme.palette.colorScheme.base,
      fontWeight: FontWeights.Medium,
      pointerEvents: 'none',
      textTransform: 'uppercase',

      '&.Mui-focused, &.Mui-active, &:hover': {
        color: theme.palette.colorScheme.base,
      },

      '&.Mui-disabled': {
        color: theme.palette.colorScheme.base,
      },

      '&.Mui-error': {
        color: theme.palette.colorScheme.base,
      },
    },
  },
});

export const getMuiTextFieldDefaultProps =
  (): ComponentsProps['MuiTextField'] => ({
    InputProps: {
      style: {},
      autoComplete: 'off',
    },
    autoComplete: 'off',
    InputLabelProps: {
      shrink: true,
    },
  });

export const getMuiFilledInputOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiFilledInput'] => ({
  root: {},
});

export const getMuiFilledInputDefaultProps =
  (): ComponentsProps['MuiFilledInput'] => ({
    autoComplete: 'off',
  });
