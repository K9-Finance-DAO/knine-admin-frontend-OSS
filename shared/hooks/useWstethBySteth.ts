import { useContractSWR, useKnBoneContractRPC } from '@knine-sdk/react';
import { BigNumber } from 'ethers';
import { STRATEGY_LAZY } from 'utils/swrStrategies';

export const useWstethBySteth = (steth: BigNumber | undefined) => {
  return useContractSWR({
    // TODO: check if we need this hook. Arguments were contract: useWSTETHContractRPC(), method: 'getWstETHByStETH'
    // now mocked to avoid errors
    contract: useKnBoneContractRPC(),
    method: 'balanceOf',
    params: [steth],
    shouldFetch: !!steth,
    config: STRATEGY_LAZY,
  });
};
