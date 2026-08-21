import { styled, Typography } from '@mui/material';
import { FontWeights } from 'styles';

export const BodyText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: FontWeights.Medium,
  color: theme.palette.colorScheme.light,
  marginTop: theme.spacing(4),
  textAlign: 'center',

  span: {
    color: theme.palette.colorScheme.orangeMid,
  },
}));
