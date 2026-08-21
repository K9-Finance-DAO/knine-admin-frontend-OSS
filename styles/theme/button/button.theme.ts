import {
  buttonClasses,
  ComponentsOverrides,
  ComponentsProps,
  Theme,
} from '@mui/material';
import {
  BORDER_RADIUS_BUTTON,
  BORDER_RADIUS_S,
  TRANSITION_DEFAULT_TIME,
} from 'styles/theme/constants';
import { FontFamilies, FontWeights } from 'styles/theme/typography';
import { CSSProperties } from 'react';

const generatePseudoElementHoverStyles = ({
  hoverStyles,
  pseudoStyles,
}: {
  hoverStyles?: Record<string, string>;
  pseudoStyles?: Record<string, string>;
}) => ({
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '-1',
    opacity: '0',
    transition: TRANSITION_DEFAULT_TIME,
    borderRadius: BORDER_RADIUS_BUTTON,
    ...pseudoStyles,
  },

  '&:hover::after': {
    opacity: '1',
    ...(hoverStyles || {}),
  },
});

export const getMuiButtonOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiButton'] => {
  const sharedStyles: CSSProperties = {
    position: 'relative',
    zIndex: '1',
    overflow: 'hidden',
  };
  return {
    root: {
      textAlign: 'center',
      color: theme.palette.colorScheme.light,
      borderRadius: BORDER_RADIUS_BUTTON,
      transition: TRANSITION_DEFAULT_TIME,
      padding: theme.spacing(1.5, 2),
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '-0.084px',
      fontWeight: FontWeights.Medium,
      textTransform: 'capitalize',
      boxShadow: 'none',
      fontFamily: FontFamilies.primary,

      '&, &:hover, &:focus, &:active': {
        boxShadow: 'none',
      },
    },

    startIcon: {
      '&>*:nth-of-type(1)': {
        fontSize: 'inherit',
      },
      marginRight: '8px',
    },

    endIcon: {
      '&>*:nth-of-type(1)': {
        fontSize: 'inherit',
      },
      marginLeft: '8px',
    },

    sizeSmall: {
      height: '40px',
    },

    sizeMedium: {
      height: '44px',
    },

    contained: {
      minWidth: 90,
      background: theme.palette.colorScheme.stroke,
      color: theme.palette.colorScheme.graySecondary,

      [`&.${buttonClasses.disabled}`]: {
        background: theme.palette.colorScheme.stroke,
        color: theme.palette.colorScheme.base,
        opacity: 0.6,
      },

      '&:hover': {
        background: theme.palette.colorScheme.blueDeepIndigo,
        color: theme.palette.colorScheme.graySecondary,
      },

      // Contained secondary
      [`&.${buttonClasses.colorSecondary}`]: {
        background: theme.palette.colorScheme.backgroundGradient,
        color: theme.palette.colorScheme.light,
        ...sharedStyles,

        ...generatePseudoElementHoverStyles({
          pseudoStyles: {
            background: theme.palette.colorScheme.orangeMid,
            color: theme.palette.colorScheme.light,
          },
        }),

        [`&.${buttonClasses.disabled}`]: {
          background: theme.palette.colorScheme.stroke,
          color: theme.palette.colorScheme.base,
        },
      },

      [`&.${buttonClasses.colorError}`]: {
        color: theme.palette.colorScheme.light,
        background: theme.palette.colorScheme.error,
        ...sharedStyles,

        ...generatePseudoElementHoverStyles({
          pseudoStyles: {
            background: theme.palette.colorScheme.redDark,
          },
        }),

        [`&.${buttonClasses.disabled}`]: {
          background: theme.palette.colorScheme.stroke,
          color: theme.palette.colorScheme.base,
        },
      },

      // button for admin panel forms
      '&.admin-form': {
        padding: theme.spacing(0.5, 1.5),
        height: 28,
        minWidth: 57,
        borderRadius: BORDER_RADIUS_S,
        color: theme.palette.colorScheme.light,
      },
    },
    outlined: {
      minWidth: 90,
      border: `1.5px solid ${theme.palette.colorScheme.orangeBase}`,
      background: 'transparent',
      ...sharedStyles,

      ...generatePseudoElementHoverStyles({
        pseudoStyles: {
          background: theme.palette.colorScheme.backgroundGradient,
          color: theme.palette.colorScheme.light,
        },
      }),

      '&:hover': {
        border: `1.5px solid transparent`,
      },

      [`&.${buttonClasses.disabled}`]: {
        border: `1.5px solid ${theme.palette.colorScheme.stroke}`,
        background: 'transparent',
        color: theme.palette.colorScheme.base,
      },

      // Outlined secondary
      [`&.${buttonClasses.colorSecondary}`]: {
        border: `1.5px solid ${theme.palette.colorScheme.base}`,
        '&::after': {
          content: 'none',
        },

        '&:hover': {
          border: `1.5px solid ${theme.palette.colorScheme.stroke}`,
          background: theme.palette.colorScheme.stroke,
          color: theme.palette.colorScheme.light,
        },

        [`&.${buttonClasses.disabled}`]: {
          border: `1.5px solid ${theme.palette.colorScheme.stroke}`,
        },
      },
    },
  };
};

export const getMuiButtonDefaultProps = (): ComponentsProps['MuiButton'] => ({
  disableElevation: false,
  disableFocusRipple: true,
  disableRipple: true,
  variant: 'contained',
  size: 'medium',
});
