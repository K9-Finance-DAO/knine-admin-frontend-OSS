import getConfig from 'next/config';

import { standardFetcher } from 'utils/standardFetcher';

const { serverRuntimeConfig } = getConfig();
const { knineBackendApi } = serverRuntimeConfig;

type SMA_APR_RESPONSE = {
  aprs: Array<{
    timeUnix: number;
    apr: number;
  }>;
  sma_apr: number;
};

export const getSmaStethApr = async (): Promise<string> => {
  const data = await standardFetcher<SMA_APR_RESPONSE>(
    `${knineBackendApi}/apr/`,
  );

  return data.sma_apr.toFixed(1);
};
