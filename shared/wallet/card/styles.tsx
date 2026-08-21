import { Box, Stack, styled } from '@mui/material';
import { BORDER_RADIUS_XL } from 'styles';

export const CardStyle = styled(Stack)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  borderRadius: BORDER_RADIUS_XL,
  background: theme.palette.colorScheme.backgroundGradient,
  minHeight: 205,

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

export const WalletCardRowStyle = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexBasis: '50%',
  flex: 1,
  margin: '20px 0',
  '&:first-of-type': {
    marginTop: 0,
  },

  '&:last-child': {
    marginBottom: 0,
  },
});

export const CardBalanceStyle = styled(Stack)({
  marginRight: '18px',
  flexBasis: '50%',
  lineHeight: '1.6em',
  '&:last-child': {
    marginRight: 0,
  },
});

const shouldForwardProp = (prop: string) =>
  !new Set(['$small', '$hidden']).has(prop);

export const CardValue = styled(Box, { shouldForwardProp })<{
  $small: boolean;
}>(({ theme, $small }) => ({
  width: '100%',
  marginTop: theme.spacing(0.5),
  fontSize: $small ? '16px' : '18px',
  lineHeight: '24px',
  whiteSpace: 'nowrap',
}));

export const CardContentStyle = styled(Box, { shouldForwardProp })<{
  $hidden?: boolean;
}>(({ $hidden }) => ({
  marginTop: '2px',
  opacity: $hidden ? 0 : 1,
  pointerEvents: $hidden ? 'none' : 'auto',
}));

export const WalletCardAccountStyle = styled(Box)({
  alignSelf: 'stretch',
  display: 'flex',
  flexBasis: '50%',
  flexGrow: 1,
  flexShrink: 1,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginLeft: 'auto',

  '& > *': {
    cursor: 'pointer',
  },
});
