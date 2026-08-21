import { styled, ToggleButton } from '@mui/material';

export const ToggleStatusButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== '$loading' && prop !== '$disabled',
})<{ $loading?: boolean; $disabled?: boolean }>(
  ({ theme, $loading, $disabled }) => ({
    cursor: $loading ? 'progress' : $disabled ? 'not-allowed' : 'pointer',
    background: $loading
      ? `${theme.palette.colorScheme.stroke} !important`
      : 'unset',
    color: $loading
      ? `${theme.palette.colorScheme.stroke} !important`
      : 'unset',
  }),
);
