import { StaticJsonRpcBatchProvider } from '@lidofinance/eth-providers';

export const resolveEns = async (
  name: string | Promise<string>,
  provider: StaticJsonRpcBatchProvider,
) => {
  const res = await provider.resolveName(name);
  return res;
};
