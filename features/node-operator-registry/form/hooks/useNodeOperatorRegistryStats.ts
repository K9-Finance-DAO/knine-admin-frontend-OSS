import { BigNumber } from 'ethers';
import { useChainId } from 'shared/hooks';
import {
  SWRResponse,
  useNodeOperatorRegistryContractRPC,
  useWrapperSWR,
} from '@knine-sdk/react';
import { STRATEGY_CONSTANT } from 'utils';

export interface INodeOperatorBaseData {
  distanceMinMax?: BigNumber;
  minAmount?: BigNumber;
  maxAmount?: BigNumber;
  isBalanced?: boolean;
  isNodeOperatorPaused?: boolean;
}

export const useNodeOperatorRegistryStats = (): Omit<
  SWRResponse<INodeOperatorBaseData>,
  'mutate'
> => {
  const { chainId } = useChainId();

  const contractRpc = useNodeOperatorRegistryContractRPC(chainId);

  return useWrapperSWR(
    ['swr:norStatusesData', contractRpc.address, chainId],
    async () => {
      const [stats, isNodeOperatorPaused] = await Promise.all([
        contractRpc.getProtocolStats(),
        contractRpc.paused(),
      ]);

      return {
        maxAmount: stats?.maxAmount,
        minAmount: stats?.minAmount,
        distanceMinMax: stats?.distanceMinMaxStake,
        isBalanced: stats?.isBalanced,
        isNodeOperatorPaused,
      };
    },
    STRATEGY_CONSTANT,
  );
};
