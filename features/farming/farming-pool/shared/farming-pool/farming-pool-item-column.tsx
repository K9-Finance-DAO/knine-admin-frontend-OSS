import { Stack, StackProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

type FarmingPoolItemColumnProps = {
  title: string;
  contentSlot: ReactNode;
};

export const FarmingPoolItemColumn = ({
  title,
  contentSlot,
  ...stackProps
}: FarmingPoolItemColumnProps & StackProps) => {
  return (
    <Stack spacing={0.5} {...stackProps}>
      <Typography
        variant="caption"
        className="xs gray"
        textTransform="capitalize"
      >
        {title}
      </Typography>

      {contentSlot}
    </Stack>
  );
};
