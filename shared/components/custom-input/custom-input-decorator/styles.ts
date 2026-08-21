import { IconButton, styled } from '@mui/material';

export const EditButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  svg: {
    fill: theme.palette.colorScheme[active ? 'orangeMid' : 'base'],
  },
}));
