import { StaticJsonRpcBatchProvider } from 'utilsApi/rpc';
import { providerFactory } from './providerFactory';
import {
  JsonRpcProvider,
  JsonRpcBatchProvider,
  StaticJsonRpcProvider,
} from '@ethersproject/providers';

export const getStaticRpcBatchProvider = providerFactory(
  StaticJsonRpcBatchProvider,
);

export const getRpcProvider = providerFactory(JsonRpcProvider);
export const getRpcBatchProvider = providerFactory(JsonRpcBatchProvider);

export const getStaticRpcProvider = providerFactory(StaticJsonRpcProvider);
