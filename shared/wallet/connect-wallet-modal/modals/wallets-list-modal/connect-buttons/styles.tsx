import { Button, styled } from '@mui/material';

export const ButtonContainer = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  alignItems: 'center',
  width: '100%',
  height: 96,
  borderRadius: '12px',
  padding: theme.spacing(1.5),
  svg: {
    width: 42,
    height: 42,
  },

  '&:disabled': {
    opacity: 0.55,
  },
}));
