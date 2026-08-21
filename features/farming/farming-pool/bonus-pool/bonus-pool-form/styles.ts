import { IconButton, styled } from '@mui/material';

export const BonusDrawerHeader = styled('div')(({ theme }) => ({
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.colorScheme.stroke}`,
  paddingBottom: theme.spacing(1.5),
  marginBottom: theme.spacing(3),
}));

export const CloseButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  borderRadius: '50%',
  background: 'transparent',
}));
