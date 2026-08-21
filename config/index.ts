import getConfig from 'next/config';
export const { serverRuntimeConfig } = getConfig();
export { default as dynamics } from './dynamics';
export * from './aggregator';
export * from './api';
export * from './cache';
export * from './estimate';
export * from './locale';
export * from './rpc';
export * from './storage';
export * from './text';
export * from './tx';
export * from './types';
export * from './units';
export * from './rateLimit';
export * from './stake';
export * from './time';
const { basePath = '' } = serverRuntimeConfig;

export const BASE_PATH_ASSET = basePath;

export const isDev = process.env.NODE_ENV === 'development';
