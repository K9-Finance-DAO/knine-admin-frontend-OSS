import { Button, Stack, styled } from '@mui/material';
import { BORDER_RADIUS_M } from 'styles';
import Icons from '../../icons';

export const HeaderStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2.5, 0),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  borderBottom: '1px solid',
  borderColor: theme.palette.colorScheme.stroke,
  [theme.breakpoints.down('md')]: {
    padding: 0,
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
    gap: 0,
    borderColor: 'transparent',
  },
}));

export const HeaderActionsStyle = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: 40,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5, 2),
    width: '100%',
    height: 'auto',
    borderBottom: `1px solid ${theme.palette.colorScheme.stroke}`,
  },
}));

export const WalletChainStyle = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 1.5),
  height: 40,
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  background: theme.palette.colorScheme.stroke,
  borderRadius: BORDER_RADIUS_M,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1, 1.5),
  },
}));

export const HeaderActionsMobileStyle = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1.75),
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const WalletArrowIcon = styled(Icons.ChevronArrow)(({ theme }) => ({
  fill: theme.palette.colorScheme.gray,
  transform: 'rotate(-90deg)',
}));
