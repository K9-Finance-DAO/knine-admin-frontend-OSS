import { KnboneAbi } from '@knine-sdk/contracts';
import { useWrapperSWR, useKnBoneContractRPC } from '@knine-sdk/react';
import { STRATEGY_LAZY } from 'utils/swrStrategies';

export type StakeInfoState = {
  isStakingPaused: boolean;
};

export const useStakingInfoState = () => {
  const knbone = useKnBoneContractRPC();

  return useWrapperSWR<StakeInfoState>(
    ['swr:paused', knbone],
    // @ts-expect-error broken lidoSWR typings
    async (_key: string, knbone: KnboneAbi) => {
      const isPaused = await knbone.paused();

      // destructuring to make hybrid array into an object,
      return {
        isStakingPaused: isPaused,
      };
    },
    {
      ...STRATEGY_LAZY,
      refreshInterval: 120000,
    },
  );
};
