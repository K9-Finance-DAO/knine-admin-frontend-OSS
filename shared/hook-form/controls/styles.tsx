import { styled, Typography } from '@mui/material';

export const ButtonContentStyle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== '$hidden' && prop !== '$disabled',
})<{ $hidden?: boolean; $disabled?: boolean }>(
  ({ $hidden, $disabled, theme }) => ({
    visibility: $hidden ? 'hidden' : 'visible',
    color: $disabled ? theme.palette.colorScheme.base : 'unset',
  }),
);
