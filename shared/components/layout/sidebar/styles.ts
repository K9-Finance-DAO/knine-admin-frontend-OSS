import {
  CSSObject,
  Drawer as MuiDrawer,
  IconButton,
  Stack,
  styled,
  Theme,
} from '@mui/material';

export const openedMixin = (theme: Theme): CSSObject => ({
  width: 272,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
});

export const closedMixin = (theme: Theme): CSSObject => ({
  width: 85,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: 0,
    width: 0,
  },
});

export const DrawerStyled = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(isOpen && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!isOpen && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const SidebarHeader = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  padding: theme.spacing(0.5, open ? 0.5 : 0.25, 3),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.colorScheme.stroke}`,
}));

export const ToggleButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'outside',
})<{ outside?: boolean }>(({ theme, outside = false }) => ({
  width: 24,
  height: 24,
  transition: 'all 0.2s ease-out',
  svg: {
    fill: theme.palette.colorScheme.gray,
    ...(outside && {
      transform: 'rotate(0.5turn)',
    }),
  },
  ...(outside && {
    position: 'fixed',
    left: 72,
    top: 32,
    zIndex: 1200,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }),
}));
