import { Layout } from 'shared/components';
import { LiquidStakingSection } from 'features/liquid-staking';
import Head from 'next/head';

const LiquidStakingPage = () => {
  return (
    <Layout>
      <Head>
        <title>Liquid Staking</title>
      </Head>
      <LiquidStakingSection />
    </Layout>
  );
};

export default LiquidStakingPage;
