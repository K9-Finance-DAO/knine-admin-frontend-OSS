import { Layout } from 'shared/components';
import { AccessSection } from 'features/access';
import Head from 'next/head';
import NoSsrWrapper from 'shared/components/no-ssr-wrapper';

const AccessPage = () => {
  return (
    <Layout>
      <Head>
        <title>Access</title>
      </Head>
      <NoSsrWrapper>
        <AccessSection />
      </NoSsrWrapper>
    </Layout>
  );
};

export default AccessPage;
