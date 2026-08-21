import { NodeOperatorStatTable } from './node-operator-stat-table';
import { Stack, Typography } from '@mui/material';
import { EntityStatusBadge } from 'shared/components';
import { useStatistic } from 'features/statistics/providers';

export const NodeOperatorStatistic = () => {
  const data = useStatistic();
  return (
    <>
      <Stack py={1} direction="row" spacing={1} my={2}>
        <Typography
          variant="body2"
          className="medium"
          color={(theme) => theme.palette.colorScheme.light}
        >
          NodeOperatorRegistry
        </Typography>
        <EntityStatusBadge
          status={data?.isNodeOperatorPaused ? 'paused' : 'active'}
        />
      </Stack>
      <NodeOperatorStatTable />
    </>
  );
};
