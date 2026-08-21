import '@mui/material/styles/createPalette';

import { ColorsPalette } from 'styles';
import * as muiStyles from '@mui/material/styles';
import { Breakpoint } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    colorScheme: ColorsPalette;
  }

  interface PaletteOptions {
    colorScheme: ColorsPalette;
  }
}

declare module '@mui/material/styles' {
  export type GridBreakpointsType<T = number> = Partial<Record<Breakpoint, T>>;

  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}
