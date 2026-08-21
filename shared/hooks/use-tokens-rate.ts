import { STRATEGY_LAZY } from 'utils/swrStrategies';
import { useWrapperSWR } from '@knine-sdk/react';

import { prependBasePath, standardFetcher } from 'utils';
import { API_ROUTES } from 'config';
import type { Rates } from 'utilsApi';

export const useTokensRate = () => {
  const swrResult = useWrapperSWR<Rates>(
    prependBasePath(API_ROUTES.TOKENS_RATES),
    standardFetcher,
    STRATEGY_LAZY,
  );

  return swrResult;
};
