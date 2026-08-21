import { useVestingContractRPC, useWrapperSWR } from '@knine-sdk/react';
import { useChainId } from 'shared/hooks';
import { STRATEGY_CONSTANT } from 'utils';
import { SECONDS_IN_A_DAY } from 'features/vesting/form/form-context/helper';

export const useVestingContractValues = () => {
  const { defaultChain } = useChainId();
  const contractRpc = useVestingContractRPC(defaultChain);
  return useWrapperSWR(
    ['swr:vestingValues'],

    async () => {
      const [settings, isPaused, DENOMINATOR, endTime] = await Promise.all([
        contractRpc.settings(),
        contractRpc.paused(),
        contractRpc.DENOMINATOR(),
        contractRpc.endTime(),
      ]);

      const { lockedOnly, backingRatio, vestingPeriod, vestingRatio } =
        settings ?? {};

      return {
        lockedOnly,
        backingRatio: (backingRatio?.toNumber() / DENOMINATOR)?.toString(),
        vestingPeriod: (
          vestingPeriod?.toNumber() / SECONDS_IN_A_DAY
        ).toString(),
        vestingRatio: (vestingRatio?.toNumber() / DENOMINATOR)?.toString(),
        isVestingPaused: isPaused,
        denominator: DENOMINATOR,
        endTime,
      };
    },
    STRATEGY_CONSTANT,
  );
};
