import { ReactNode } from 'react';
import { Alert, StackProps } from '@mui/material';

interface ErrorBlockBaseProps extends StackProps {
  text: ReactNode;
}

export const ErrorBlockBase = ({ text }: ErrorBlockBaseProps) => {
  return (
    <Alert variant="filled" severity="error">
      {text}
    </Alert>
  );
};
