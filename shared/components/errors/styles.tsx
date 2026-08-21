import { Stack, styled } from '@mui/material';
import { BORDER_RADIUS_L } from 'styles';

export const ErrorBox = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: BORDER_RADIUS_L,
  border: '1px solid',
  alignItems: 'center',
  borderColor: theme.palette.colorScheme.stroke,
  background: theme.palette.colorScheme.darkSecondary,
  wordWrap: 'break-word',
}));
