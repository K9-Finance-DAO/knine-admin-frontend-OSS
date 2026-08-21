import { Layout } from 'shared/components';
import { Stack } from '@mui/material';
import { Statistics } from 'features/statistics';
import Head from 'next/head';
import { LiquidStakingBaseDataProvider } from 'providers/liquid-staking-base-info';

const StatisticsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Statistics</title>
      </Head>
      <Stack>
        <LiquidStakingBaseDataProvider>
          <Statistics />
        </LiquidStakingBaseDataProvider>
      </Stack>
    </Layout>
  );
};

export default StatisticsPage;
