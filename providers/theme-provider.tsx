import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { theme } from 'styles';

// TODO: Uncomment CssBaseline later
export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
