import { Stack, StackProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export const FormControlGroupButtons = ({
  children,
  ...stackProps
}: StackProps & PropsWithChildren) => {
  return (
    <Stack direction="row" spacing={2} {...stackProps}>
      {children}
    </Stack>
  );
};
