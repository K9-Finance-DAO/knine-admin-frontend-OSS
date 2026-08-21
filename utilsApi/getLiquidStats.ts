import getConfig from 'next/config';
import { standardFetcher } from 'utils/standardFetcher';

const { serverRuntimeConfig } = getConfig();
const { knineBackendApi } = serverRuntimeConfig;

export type Stats = {
  id: number;
  total_supply: string;
  market_cap: string;
  holders: string;
  total_staked: string;
  total_staked_usd: string;
  total_rewards: string;
  total_rewards_usd: string;
};

type GetLiquidStats = () => Promise<Stats>;

export const getLiquidStats: GetLiquidStats = async () => {
  console.debug('[getLiquidStats fetcher] Started fetching...');
  const apiUrl = `${knineBackendApi}/stats`;

  const liquidStats = await standardFetcher<Stats>(apiUrl);

  console.debug('[getLiquidStats fetcher] Lido stats:', liquidStats);
  return liquidStats;
};
