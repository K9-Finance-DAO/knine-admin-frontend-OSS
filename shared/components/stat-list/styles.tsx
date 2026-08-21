import { Stack, styled, Typography, TypographyProps } from '@mui/material';
import { BorderedBox } from '../bordered-box';
import { BORDER_RADIUS_L, BORDER_RADIUS_XL } from 'styles';

export const StatListCard = styled(BorderedBox)(({ theme }) => ({
  padding: theme.spacing(2.5, 2),
  gap: theme.spacing(2),
  borderRadius: BORDER_RADIUS_XL,
}));

export const StatListItem = styled(Stack)(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

export const StatListWithDivider = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1.25, 0),
  flexDirection: 'row',
  'div + div': {
    borderLeft: `1px solid ${theme.palette.colorScheme.stroke}`,
  },
}));

export const StatListTitle = ({ children, ...rest }: TypographyProps) => (
  <Typography
    variant="caption"
    className="xxs medium"
    textAlign="center"
    color={(theme) => theme.palette.colorScheme.gray}
    textTransform="uppercase"
    {...rest}
  >
    {children}
  </Typography>
);

export const SecondaryListTitleBlock = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  width: 179,
  justifyContent: 'center',
  alignItems: 'center',
  border: `1.5px solid ${theme.palette.colorScheme.stroke}`,
  borderTopRightRadius: BORDER_RADIUS_L,
  borderTopLeftRadius: BORDER_RADIUS_L,
}));

export const AddressListItem = styled(BorderedBox)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
