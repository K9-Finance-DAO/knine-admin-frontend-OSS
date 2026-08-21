import {
  COLOR_CAPTION,
  COLOR_GRAY,
  COLOR_ORANGE_MID,
  COLOR_GRAY_SECONDARY,
  COLOR_BASE,
  COLOR_GREEN_SHAMROCK,
  COLOR_WH,
} from 'styles/theme/constants';

export enum FontFamilies {
  primary = '"Inter", sans-serif',
}

export enum FontWeights {
  Regular = 400,
  Medium = 500,
  SemiBold = 600,
  Bold = 700,
}

export const colorVariations = {
  '&.white': {
    color: COLOR_WH,
  },
  '&.red': {
    color: '',
  },
  '&.neutral': {
    color: '',
  },
  '&.gray': {
    color: COLOR_GRAY,
  },
  '&.gray-secondary': {
    color: COLOR_GRAY_SECONDARY,
  },
  '&.green-shamrock': {
    color: COLOR_GREEN_SHAMROCK,
  },
  '&.accent': {
    color: COLOR_ORANGE_MID,
  },
  '&.caption': {
    color: COLOR_CAPTION,
  },
  '&.base': {
    color: COLOR_BASE,
  },
};

export const weightVariations = {
  '&.regular': {
    fontWeight: FontWeights.Regular,
  },
  '&.medium': {
    fontWeight: FontWeights.Medium,
  },
  '&.semi-bold': {
    fontWeight: FontWeights.SemiBold,
  },
  '&.bold': {
    fontWeight: FontWeights.Bold,
  },
};

export const familyVariations = {
  '&.primary': {},
  '&.secondary': {},
  '&.tertiary': {},
};
