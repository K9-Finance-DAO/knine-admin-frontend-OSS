import { Stack, styled } from '@mui/material';
import { BORDER_RADIUS_M, BORDER_RADIUS_S } from 'styles';

export const SidebarBottomBlockStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  background: theme.palette.colorScheme.backgroundBase,
  borderRadius: BORDER_RADIUS_M,
}));

export const SidebarBottomBlockButton = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: theme.palette.colorScheme.darkSecondary,
  borderRadius: BORDER_RADIUS_S,
}));
