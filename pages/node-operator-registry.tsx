import { Layout } from 'shared/components';
import { NodeOperatorRegistry } from '../features/node-operator-registry';
import Head from 'next/head';

const NodeOperatorRegistryPage = () => {
  return (
    <Layout>
      <Head>
        <title>Node Operator Registry</title>
      </Head>
      <NodeOperatorRegistry />
    </Layout>
  );
};

export default NodeOperatorRegistryPage;
