import { Layout } from 'shared/components';
import Head from 'next/head';
import { RealYieldStakingSection } from 'features/real-yield-staking';
import { useWeb3Key } from 'shared/hooks/useWeb3Key';

const RealYieldStaking = () => {
  const key = useWeb3Key();

  return (
    <Layout>
      <Head>
        <title>Real Yield Staking</title>
      </Head>
      <RealYieldStakingSection key={key} />
    </Layout>
  );
};

export default RealYieldStaking;
