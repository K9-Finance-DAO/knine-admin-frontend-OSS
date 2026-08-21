import NextBundleAnalyzer from '@next/bundle-analyzer';
import buildDynamics from './scripts/build-dynamics.mjs';
import getDomainFromUrl from "./utils/getDomainFromUrl.js";

buildDynamics();

// https://nextjs.org/docs/pages/api-reference/next-config-js/basePath
const basePath = process.env.BASE_PATH ?? '';

const rpcUrls_1 = process.env.EL_RPC_URLS_1?.split(',') ?? [];
const rpcUrls_5 = process.env.EL_RPC_URLS_5?.split(',') ?? [];
const rpcUrls_11155111 = process.env.EL_RPC_URLS_11155111?.split(',') ?? [];
const rpcUrls_157 = process.env.EL_RPC_URLS_157?.split(',') ?? [];
const rpcUrls_109 = process.env.EL_RPC_URLS_109?.split(',') ?? [];

const knineBackendApi = process.env.K9_API_BASE_PATH;
const bridgeBaseApi = process.env.BRIDGE_API_BASE_PATH;

const cspTrustedHosts = process.env.CSP_TRUSTED_HOSTS;
const cspReportOnly = process.env.CSP_REPORT_ONLY;
const cspReportUri = process.env.CSP_REPORT_URI;

const subgraphMainnet = process.env.SUBGRAPH_MAINNET;
const subgraphSepolia = process.env.SUBGRAPH_SEPOLIA;

const subgraphRequestTimeout = process.env.SUBGRAPH_REQUEST_TIMEOUT;

const analyzeBundle = process.env.ANALYZE_BUNDLE ?? false;

// rate limit
const rateLimit = process.env.RATE_LIMIT || 100;
const rateLimitTimeFrame = process.env.RATE_LIMIT_TIME_FRAME || 60; // 1 minute;

const defaultChain = process.env.DEFAULT_CHAIN;
const liquidStakingDefaultChain = process.env.LIQUID_STAKING_DEFAULT_CHAIN;

const developmentMode = process.env.NODE_ENV === 'development';

// cache control
export const CACHE_CONTROL_HEADER = 'x-cache-control';
export const CACHE_CONTROL_PAGES = [
  '/manifest.json',
  '/favicon:size*',
  '/',
  '/statistics',
  '/access',
  '/node-operator-registry',
  '/liquid-staking',
  '/runtime/window-env.js',
];
export const CACHE_CONTROL_VALUE =
  'public, max-age=15, s-max-age=30, stale-if-error=604800, stale-while-revalidate=172800';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: analyzeBundle,
});

export default withBundleAnalyzer({
  basePath,
  trailingSlash: false,
  assetPrefix: undefined,
  exportPathMap: undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    esmExternals: true,
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'webpack-preprocessor-loader',
            options: {
              params: {
                IPFS_MODE: false,
              },
            },
          },
        ],
      },
    );

    return config;
  },
  serverRuntimeConfig: {
    basePath,
    rpcUrls_1,
    rpcUrls_5,
    rpcUrls_11155111,
    rpcUrls_157,
    rpcUrls_109,
    cspTrustedHosts,
    cspReportOnly,
    cspReportUri,
    subgraphMainnet,
    subgraphSepolia,
    subgraphRequestTimeout,
    rateLimit,
    rateLimitTimeFrame,
    defaultChain,
    developmentMode,
    knineBackendApi,
    bridgeBaseApi,
    liquidStakingDefaultChain
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [getDomainFromUrl(knineBackendApi)],
  },
});
