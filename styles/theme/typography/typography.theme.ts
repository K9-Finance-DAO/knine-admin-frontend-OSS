import { TypographyOptions } from '@mui/material/styles/createTypography';
import {
  colorVariations,
  familyVariations,
  FontFamilies,
  FontWeights,
  weightVariations,
} from './typography.config';
import { COLOR_LIGHT } from 'styles/theme/constants';

export const getTypographyOptions = (): TypographyOptions => ({
  fontFamily: FontFamilies.primary,
  allVariants: {
    color: COLOR_LIGHT,
    fontWeight: FontWeights.Regular,
    textAlign: 'left',
    fontStyle: 'normal',
    lineHeight: '20px',
    ...colorVariations,
    ...weightVariations,
    ...familyVariations,
  },

  h1: {
    fontSize: '48px',
    lineHeight: '56px',
  },

  h2: {
    fontSize: '40px',
    lineHeight: '48px',
  },

  h3: {
    fontSize: '32px',
    lineHeight: '40px',
  },

  h4: {
    fontSize: '24px',
    lineHeight: '32px',
  },

  h5: {
    fontSize: '20px',
    lineHeight: '28px',
  },

  h6: {
    fontSize: '18px',
    lineHeight: '24px',
  },

  body1: {
    fontSize: '14px',
    lineHeight: '20px',
  },

  body2: {
    fontSize: '16px',
    lineHeight: '24px',

    '&.lg': {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },

  subtitle1: {
    fontSize: '20px',
    lineHeight: '28px',
  },

  subtitle2: {
    fontSize: '20px',
    lineHeight: '28px',
  },

  caption: {
    fontSize: '16px',
    lineHeight: '24px',

    '&.xl': {
      fontSize: '24px',
      lineHeight: '32px',
    },

    '&.lg': {
      fontSize: '18px',
      lineHeight: '24px',
    },

    '&.sm': {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: FontWeights.Medium,
    },

    '&.xs': {
      fontSize: '12px',
      lineHeight: '16px',
    },

    '&.xxs': {
      fontSize: '11px',
      lineHeight: '12px',
      fontWeight: FontWeights.Medium,
    },
  },

  button: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: FontWeights.Medium,
    textTransform: 'capitalize',
  },
});
