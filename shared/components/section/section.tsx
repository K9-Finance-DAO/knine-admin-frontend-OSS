import { Stack, StackProps } from '@mui/material';

export const Section = ({ children, ...rest }: StackProps) => {
  return (
    <Stack component="section" my={3.5} spacing={3} {...rest}>
      {children}
    </Stack>
  );
};
