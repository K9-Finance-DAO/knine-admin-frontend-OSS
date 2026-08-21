import { Stack, styled } from '@mui/material';
import { BORDER_RADIUS_L } from 'styles';
import { BorderedBox } from 'shared/components';

export const FeeDistributionTitleBox = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  maxWidth: 180,
  justifyContent: 'center',
  alignItems: 'center',
  border: `1.5px solid ${theme.palette.colorScheme.stroke}`,
  borderTopRightRadius: BORDER_RADIUS_L,
  borderTopLeftRadius: BORDER_RADIUS_L,
  margin: '0 auto',
}));

export const AddressListItem = styled(BorderedBox)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
