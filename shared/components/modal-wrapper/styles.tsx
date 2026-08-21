import { Stack, styled } from '@mui/material';

export const ModalHeader = styled(Stack, {
  shouldForwardProp: (prop) => prop !== '$borderedHeader' && prop !== '$title',
})<{ $borderedHeader?: boolean; $title?: boolean }>(({
  theme,
  $borderedHeader,
  $title,
}) => {
  return {
    padding: $title ? theme.spacing(0, 3, 1.75) : 0,
    position: 'relative',
    borderBottom: `1px solid ${$borderedHeader ? theme.palette.colorScheme.stroke : 'transparent'}`,
  };
});
