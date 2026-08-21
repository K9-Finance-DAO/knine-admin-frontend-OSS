import { KnboneStatistic } from './knbone-statistic/knbone-statistic';
import { StatisticProvider } from './providers';
import NoSSRWrapper from 'shared/components/no-ssr-wrapper';
import { NodeOperatorStatistic } from './node-operator-statistic';
import { Validators } from './validators/validators';
import { Box } from '@mui/material';

export const Statistics = () => {
  return (
    <NoSSRWrapper>
      <StatisticProvider>
        <Box pb={7}>
          <KnboneStatistic />
          <NodeOperatorStatistic />
          <Validators />
        </Box>
      </StatisticProvider>
    </NoSSRWrapper>
  );
};
