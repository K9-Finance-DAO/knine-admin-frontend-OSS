import { useClientConfig } from 'providers/client-config';
import {
  useRealYieldStakingContractRPC,
  useSDK,
  useWrapperSWR,
} from '@knine-sdk/react';
import { RealYieldStakingAbi } from '@knine-sdk/contracts';
import { BigNumber } from 'ethers';
import { STRATEGY_LAZY } from 'utils';
import { formatEther } from '@ethersproject/units';
import { Big } from '../../liquid-staking/rewards/helpers';

export type PoolInfo = {
  startTime: number;
  endTime: number;
  rps: number | string;
};

export type RealYieldStakingInfo = {
  totalRewards: BigNumber;
  maxLockMultiplier: number;
  totalStakers: number;
  poolInfo: PoolInfo;
};

export const useRealYieldStakingInfo = () => {
  const { providerRpc } = useSDK();
  const { defaultChain } = useClientConfig();
  const realYieldStaking = useRealYieldStakingContractRPC(defaultChain);

  return useWrapperSWR<RealYieldStakingInfo>(
    ['swr-real-yield-staking-info', realYieldStaking],
    // @ts-expect-error broken lidoSWR typings
    async (_key: string, realYieldStaking: RealYieldStakingAbi) => {
      const maxLockMultiplier = await realYieldStaking.maxLockMultiplier();
      const poolInfo = await realYieldStaking.poolInfo();
      const totalRewards = await providerRpc.getBalance(
        realYieldStaking.address,
      );
      const parsedPoolInfo: PoolInfo = {
        startTime: +poolInfo[0],
        endTime: +poolInfo[1],
        rps: new Big(formatEther(poolInfo[4])).toString(),
      };

      return {
        maxLockMultiplier: +formatEther(maxLockMultiplier),
        totalRewards,
        poolInfo: parsedPoolInfo,
      };
    },
    {
      ...STRATEGY_LAZY,
      refreshInterval: 60000,
    },
  );
};
