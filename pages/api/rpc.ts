import { dynamics } from 'config';
import {
  rateLimit,
  defaultErrorHandler,
  rpcFactory,
  rpcUrls,
  decorateRequestHandler,
  fetchRpc,
} from 'utilsApi';

const rpc = rpcFactory({
  fetchRpc,
  allowedRPCMethods: [
    'test',
    'eth_call',
    'eth_gasPrice',
    'eth_getCode',
    'eth_estimateGas',
    'eth_getBlockByNumber',
    'eth_feeHistory',
    'eth_getBalance',
    'eth_blockNumber',
    'eth_getTransactionByHash',
    'eth_getTransactionReceipt',
    'eth_getTransactionCount',
    'eth_sendRawTransaction',
    'eth_getLogs',
    'eth_chainId',
    'net_version',
  ],
  defaultChain: `${dynamics.liquidStakingDefaultChain}`,
  providers: rpcUrls,
});

export default decorateRequestHandler([rateLimit, defaultErrorHandler])(rpc);
