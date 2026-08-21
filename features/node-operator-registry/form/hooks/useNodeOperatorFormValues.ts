import { useChainId } from 'shared/hooks';
import {
  useNodeOperatorRegistryContractRPC,
  useWrapperSWR,
} from '@knine-sdk/react';
import { useWeb3 } from 'rnb-web3/web3-react';
import { STRATEGY_CONSTANT } from 'utils';

export const useNodeOperatorFormValues = () => {
  const { chainId: liquidChainId } = useChainId();
  const nodeOperatorContractRpc =
    useNodeOperatorRegistryContractRPC(liquidChainId);
  const { account, active } = useWeb3();

  const shouldFetch = !!account && active;

  const swr = useWrapperSWR(
    shouldFetch ? ['swr:node-operator-settings', account] : null,
    async () => {
      const [
        knBoneAddress,
        distanceThreshold,
        minRequestWithdrawRange,
        maxWithdrawPercentagePerRebalance,
      ] = await Promise.all([
        nodeOperatorContractRpc.knBONE(),
        nodeOperatorContractRpc.DISTANCE_THRESHOLD_PERCENTS(),
        nodeOperatorContractRpc.MIN_REQUEST_WITHDRAW_RANGE_PERCENTS(),
        nodeOperatorContractRpc.MAX_WITHDRAW_PERCENTAGE_PER_REBALANCE(),
      ]);

      return {
        knBoneAddress: knBoneAddress?.toString(),
        distanceThreshold: distanceThreshold?.toString(),
        minRequestWithdrawRange: minRequestWithdrawRange?.toString(),
        maxWithdrawPercentagePerRebalance:
          maxWithdrawPercentagePerRebalance?.toString(),
      };
    },
    STRATEGY_CONSTANT,
  );

  return swr;
};
