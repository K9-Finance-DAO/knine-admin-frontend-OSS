import { alpha } from '@mui/material';

export const COLOR_WH = '#FFFFFF';
export const COLOR_BLACK = '#090C18';
export const COLOR_DARK_SECONDARY = '#0D1223';
export const COLOR_DARK_TERTIARY = '#080A12';
export const COLOR_BLUE_DEEP_INDIGO = '#3F496A';
export const COLOR_STROKE = '#242B41';
export const COLOR_BASE = '#525E88';
export const COLOR_MID = '#6774A4';
export const COLOR_GRAY = '#8590B6';
export const COLOR_GRAY_SECONDARY = '#A4ACC8';
export const COLOR_GRAY_TERNARY = alpha(COLOR_WH, 0.3);

export const COLOR_LIGHT = '#E1E3ED';
export const COLOR_LIGHT_SECONDARY = '#C2C8DB';

export const COLOR_CAPTION = alpha(COLOR_WH, 0.7);

export const COLOR_BLACKOUT = '#130701';
export const COLOR_BROWN = '#802F0A';
export const COLOR_ORANGE_DARK = '#E9590C';
export const COLOR_ORANGE_BASE = '#EE6E21';
export const COLOR_ORANGE_SECONDARY = '#F17B2C';
export const COLOR_ORANGE_MID = '#EF7C31';
export const COLOR_ORANGE_LIGHT = '#F29055';
export const COLOR_PEACH = '#F5A284';
export const COLOR_PEACH_LIGHT = '#FADACF';
export const COLOR_EYEBALL = '#FFF9F8';

export const COLOR_WINE = '#710E21';
export const COLOR_BLUE = '#375DFB';
export const COLOR_BLUE_LIGHT = '#3B99FC';
export const COLOR_SUCCESS = '#19B400';
export const COLOR_RED = '#F84545';
export const COLOR_RED_DARK = '#AF1D38';
export const COLOR_INFO = '#162664';
export const COLOR_DARK_GREEN = '#176448';
export const COLOR_GREEN_SHAMROCK = '#38C793';
export const COLOR_ERROR = '#DF1C41';
export const COLOR_GREEN_LIGHT = '#CBF5E5';
export const COLOR_DANGER = '#DF1C41';

export const BACKGROUND_BASE = '#13192A';

export const GRADIENT_ACCENT =
  '-webkit-linear-gradient(64deg, #DF391F 0%, #F4A73C 100%)';
export const GRADIENT_ACCENT_SECONDARY =
  'linear-gradient(63.9deg, #DF7B1F 0%, #6C3CF4 100%)';
export const GRADIENT_DUSK =
  'linear-gradient(90deg, #2D344B -1.68%, rgba(45, 52, 75, 0.00) 85.31%)';

export const colorsMap = {
  wine: COLOR_WINE,
  success: COLOR_SUCCESS,
  black: COLOR_BLACK,
  darkSecondary: COLOR_DARK_SECONDARY,
  darkTertiary: COLOR_DARK_TERTIARY,
  blueDeepIndigo: COLOR_BLUE_DEEP_INDIGO,
  stroke: COLOR_STROKE,
  base: COLOR_BASE,
  mid: COLOR_MID,
  gray: COLOR_GRAY,
  graySecondary: COLOR_GRAY_SECONDARY,
  grayTernary: COLOR_GRAY_TERNARY,
  light: COLOR_LIGHT,
  lightSecondary: COLOR_LIGHT_SECONDARY,
  caption: COLOR_CAPTION,
  blackout: COLOR_BLACKOUT,
  brown: COLOR_BROWN,
  orangeDark: COLOR_ORANGE_DARK,
  orangeBase: COLOR_ORANGE_BASE,
  orangeSecondary: COLOR_ORANGE_SECONDARY,
  orangeMid: COLOR_ORANGE_MID,
  orangeLight: COLOR_ORANGE_LIGHT,
  peach: COLOR_PEACH,
  peachLight: COLOR_PEACH_LIGHT,
  eyeball: COLOR_EYEBALL,
  blue: COLOR_BLUE,
  blueLight: COLOR_BLUE_LIGHT,
  red: COLOR_RED,
  redDark: COLOR_RED_DARK,
  info: COLOR_INFO,
  darkGreen: COLOR_DARK_GREEN,
  greenShamrock: COLOR_GREEN_SHAMROCK,
  backgroundBase: BACKGROUND_BASE,
  backgroundGradient: GRADIENT_ACCENT,
  backgroundGradientSecondary: GRADIENT_ACCENT_SECONDARY,
  white: COLOR_WH,
  error: COLOR_ERROR,
  greenLight: COLOR_GREEN_LIGHT,
  danger: COLOR_DANGER,
};

export type ColorsPalette = typeof colorsMap;
