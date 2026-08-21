import { Button, Stack, styled } from '@mui/material';
import { BORDER_RADIUS_L } from 'styles';

export const AccountModalContentStyle = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
  background: theme.palette.colorScheme.darkSecondary,
  border: `1px solid ${theme.palette.colorScheme.stroke}`,
  borderRadius: BORDER_RADIUS_L,
  padding: theme.spacing(2),
}));

export const AccountModalActionButton = styled(Button)(({ theme }) => ({
  padding: 0,
  textTransform: 'none',
  svg: {
    fill: theme.palette.colorScheme.base,
  },
  '&:hover': {
    background: 'transparent',
    color: theme.palette.colorScheme.white,
    svg: {
      fill: theme.palette.colorScheme.gray,
    },
  },
}));
