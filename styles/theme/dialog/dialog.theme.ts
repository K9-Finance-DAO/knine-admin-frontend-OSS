import { ComponentsOverrides, Theme } from '@mui/material';
import { BORDER_RADIUS_XXL } from '../constants';

export const getMuiDialogOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiDialog'] => ({
  root: {
    zIndex: 10000,
  },
  paper: {
    padding: theme.spacing(3),
    background: theme.palette.colorScheme.backgroundBase,
    borderRadius: BORDER_RADIUS_XXL,
    maxWidth: 440,
    width: '100%',
  },
});
