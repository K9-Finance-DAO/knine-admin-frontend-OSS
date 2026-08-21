import { Icons } from 'shared/components/index';
import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

type InfoTextProps = {
  text: ReactNode;
};

export const InfoText = ({ text }: InfoTextProps) => {
  return (
    <Stack component="span" direction="row" alignItems="center" spacing={0.5}>
      <Icons.HelperInputInfo />
      <Typography variant="caption" className="xs gray">
        {text}
      </Typography>
    </Stack>
  );
};
