import { Layout } from 'shared/components';
import Head from 'next/head';
import { ShibariumToken } from 'features/shibarium-token';

const ShibariumTokenPage = () => {
  return (
    <Layout>
      <Head>
        <title>Shibarium Token</title>
      </Head>
      <ShibariumToken />
    </Layout>
  );
};

export default ShibariumTokenPage;
