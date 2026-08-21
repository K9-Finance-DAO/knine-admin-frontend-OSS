import { ComponentsOverrides, Theme } from '@mui/material';

export const getMuiSliderOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiSlider'] => ({
  root: {
    color: theme.palette.colorScheme.stroke,
    height: 4,
    width: '100%',
  },
  thumb: {
    height: 24,
    width: 24,
    background: theme.palette.colorScheme.backgroundGradient,
    border: `1px solid ${theme.palette.colorScheme.peach}`,
    boxShadow: 'none !important',
  },
  active: {},
  track: {
    color: theme.palette.colorScheme.orangeDark,
    height: 4,
  },
});
