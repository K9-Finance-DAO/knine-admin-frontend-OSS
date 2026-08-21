import { Layout } from 'shared/components';
import { VestingSection } from 'features/vesting';
import Head from 'next/head';

const VestingPage = () => {
  return (
    <Layout>
      <Head>
        <title>Vesting</title>
      </Head>
      <VestingSection />
    </Layout>
  );
};

export default VestingPage;
