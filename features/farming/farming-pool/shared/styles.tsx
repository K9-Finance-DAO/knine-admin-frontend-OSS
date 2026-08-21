import { Button, styled } from '@mui/material';

export const EditButton = styled(Button)(({ theme }) => ({
  svg: {
    fill: theme.palette.colorScheme.graySecondary,
  },
}));
