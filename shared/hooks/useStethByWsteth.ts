import { useContractSWR, useKnBoneContractRPC } from '@knine-sdk/react';
import { BigNumber } from 'ethers';
import { STRATEGY_LAZY } from 'utils/swrStrategies';

export const useStethByWsteth = (wsteth: BigNumber | undefined) => {
  return useContractSWR({
    contract: useKnBoneContractRPC(),
    method: 'convertBONEToKnBONE',
    params: [wsteth],
    shouldFetch: !!wsteth,
    config: STRATEGY_LAZY,
  });
};
