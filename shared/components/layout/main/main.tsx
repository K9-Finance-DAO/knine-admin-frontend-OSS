import { FC } from 'react';
import { ContainerProps, Container } from '@mui/material';

export const Main: FC<ContainerProps> = (props) => {
  return <Container component="main" {...props} />;
};
