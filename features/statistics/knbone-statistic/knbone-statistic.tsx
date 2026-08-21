import { EntityStatusBadge, ImageWrapper } from 'shared/components';
import { StatTable } from './stat-table';
import { Stack, Typography } from '@mui/material';
import { useStatistic } from 'features/statistics/providers';

export const KnboneStatistic = () => {
  const { isPaused } = useStatistic();

  return (
    <>
      <Stack py={1} direction="row" spacing={1} my={2}>
        <ImageWrapper
          stackProps={{ sx: { width: 'fit-content' } }}
          contentImg={{
            src: '/kn-bone.webp',
            alt: 'kn bone logo',
          }}
        >
          <Typography
            variant="body2"
            className="medium"
            color={(theme) => theme.palette.colorScheme.light}
          >
            knBONE
          </Typography>
        </ImageWrapper>
        <EntityStatusBadge status={isPaused ? 'paused' : 'active'} />
      </Stack>
      <StatTable />
    </>
  );
};
