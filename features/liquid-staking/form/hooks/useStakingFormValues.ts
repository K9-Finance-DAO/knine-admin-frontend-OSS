import { useKnBoneContractRPC, useWrapperSWR } from '@knine-sdk/react';
import { useCallback } from 'react';
import { useChainId } from 'shared/hooks';
import { STRATEGY_CONSTANT } from 'utils';
import { useWeb3 } from 'rnb-web3/web3-react';

export const useStakingFormValues = () => {
  const { chainId: liquidChainId } = useChainId();
  const knBoneContractRpc = useKnBoneContractRPC(liquidChainId);
  const { account, active } = useWeb3();

  const shouldFetch = !!account && active;

  const swr = useWrapperSWR(
    shouldFetch ? ['swr:staking-settings', account] : null,
    async () => {
      const [
        protocolFee,
        entityFees,
        daoAddress,
        instantPoolAddress,
        nodeOperatorAddress,
        l2StakingAddress,
        unstBONEAddress,
        rewardDistributionLowerBound,
        delegationLowerBound,
        instantPoolUsageFee,
      ] = await Promise.all([
        knBoneContractRpc.protocolFee(),
        knBoneContractRpc.entityFees(),
        knBoneContractRpc.dao(),
        knBoneContractRpc.instantPool(),
        knBoneContractRpc.nodeOperatorRegistry(),
        knBoneContractRpc.l2Staking(),
        knBoneContractRpc.unstBONE(),
        knBoneContractRpc.rewardDistributionLowerBound(),
        knBoneContractRpc.delegationLowerBound(),
        knBoneContractRpc.instantPoolUsageFee(),
      ]);

      const { dao, operators, instantPool, staking } = entityFees ?? {};
      return {
        protocolFee: protocolFee?.toString(),
        entityFees: {
          dao: dao?.toString(),
          operators: operators?.toString(),
          instantPool: instantPool?.toString(),
          staking: staking?.toString(),
        },
        daoAddress,
        instantPoolAddress,
        nodeOperatorAddress,
        unstBONEAddress,
        l2StakingAddress,
        rewardDistributionLowerBound: rewardDistributionLowerBound?.toString(),
        delegationLowerBound: delegationLowerBound,
        instantPoolUsageFee: instantPoolUsageFee,
        totalError: '',
      };
    },
    STRATEGY_CONSTANT,
  );
  const oldData = swr.data;
  const mutate = swr.mutate;
  const optimisticClaimRequests = useCallback(async () => {
    if (!oldData) return undefined;

    // @ts-expect-error @todo: Update mutate logic
    return mutate({}, true);
  }, [oldData, mutate]);

  const revalidate = useCallback(
    () => mutate(oldData, true),
    [oldData, mutate],
  );

  return { ...swr, optimisticClaimRequests, revalidate };
};
