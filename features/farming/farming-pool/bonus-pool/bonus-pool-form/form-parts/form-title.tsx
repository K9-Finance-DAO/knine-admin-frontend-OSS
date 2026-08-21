import { FontWeights } from 'styles';
import { Typography, TypographyProps } from '@mui/material';

export const FormTitle = (props: TypographyProps) => {
  return (
    <Typography
      variant="body2"
      className="lg gray-secondary"
      fontWeight={FontWeights.Medium}
      {...props}
    >
      {props.children}
    </Typography>
  );
};
