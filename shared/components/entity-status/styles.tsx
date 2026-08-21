import { CSSObject, Stack, styled, Theme } from '@mui/material';
import { BORDER_RADIUS_S } from 'styles';
import { StatusType } from './entity-status';

export const mapStatusToBadgeStyles: (
  theme: Theme,
  status: StatusType,
) => CSSObject = (theme, status) => {
  if (status === 'active')
    return {
      background: theme.palette.colorScheme.greenShamrock,
      color: theme.palette.colorScheme.stroke,
    };
  return {
    background: theme.palette.colorScheme.redDark,
    color: theme.palette.colorScheme.light,
  };
};

export const StatusBadge = styled(Stack, {
  shouldForwardProp: (prop: string) => prop !== '$variant',
})<{ $variant: StatusType }>(({ theme, $variant }) => ({
  width: 78,
  height: 24,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: BORDER_RADIUS_S,
  ...mapStatusToBadgeStyles(theme, $variant),
}));
