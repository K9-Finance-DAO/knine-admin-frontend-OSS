import { Box, Stack, styled, Typography } from '@mui/material';
import { BORDER_RADIUS_S } from 'styles';
import Icons from 'shared/components/icons';

type MaybeActive = {
  isActive: boolean;
  href?: string;
  component?: string;
};

export const CollapsedSidebarTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(1.25),
  color: theme.palette.colorScheme.gray,
  textAlign: 'center',
}));

export const SidebarNavLink = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<MaybeActive>(({ theme, isActive, href, component }) => ({
  component,
  href,
  flexDirection: 'row',
  padding: theme.spacing(1, 1.5),
  alignItems: 'center',
  justifyContent: 'space-between',
  background: isActive ? theme.palette.colorScheme.stroke : 'transparent',
  borderRadius: BORDER_RADIUS_S,
  cursor: 'pointer',
}));

export const SidebarNavLinkActiveMarker = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  width: 4,
  height: 20,
  background: theme.palette.colorScheme.orangeMid,
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
}));

export const SidebarNavLinkContent = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<MaybeActive>(({ theme, isActive }) => ({
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  svg: {
    fill: theme.palette.colorScheme[isActive ? 'orangeMid' : 'base'],
  },
}));

export const ChevronArrowWrapper = styled(Icons.ChevronArrow)(({ theme }) => ({
  fill: theme.palette.colorScheme.gray,
  transform: 'rotate(0.5turn)',
}));
