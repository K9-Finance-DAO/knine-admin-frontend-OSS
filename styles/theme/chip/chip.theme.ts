import { ComponentsOverrides, Theme } from '@mui/material';

export const getMuiChipOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiChip'] => ({
  root: {
    fontWeight: 500,
    borderRadius: 8,
    fontSize: 12,
    minWidth: 96,
    height: 24,
  },

  colorSuccess: {
    color: theme.palette.colorScheme.black,
    backgroundColor: theme.palette.colorScheme.greenShamrock,
  },
});
