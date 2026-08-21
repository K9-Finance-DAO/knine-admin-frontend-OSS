import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import { StopFarmingPoolButton } from './stop-farming-pool-button';

export const HeaderControls = memo(() => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
      mt={3}
    >
      <Typography variant="h5" className="white">
        Edit farming pool
      </Typography>
      <StopFarmingPoolButton />
    </Stack>
  );
});
