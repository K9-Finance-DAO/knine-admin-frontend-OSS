import {
  useContractSWR,
  useKnBoneContractRPC,
  useWrapperSWR,
} from '@knine-sdk/react';
import { useMemo } from 'react';
import { useChainId, useStakingInfoState } from 'shared/hooks';
import { STRATEGY_CONSTANT, STRATEGY_LAZY } from 'utils';
import type { LSBaseData } from './types';

export const useLSBaseContractData = (): LSBaseData => {
  const { chainId } = useChainId();

  const contractRpc = useKnBoneContractRPC(chainId);

  const { data, initialLoading } = useWrapperSWR(
    ['swr:fees', contractRpc],
    async () => {
      const [protocolFee, entityFees] = await Promise.all([
        contractRpc.protocolFee(),
        contractRpc.entityFees(),
      ]);

      return { protocolFee, entityFees };
    },
    STRATEGY_CONSTANT,
  );

  const { data: totalPooledBone, initialLoading: totalPooledLoading } =
    useContractSWR({
      contract: contractRpc,
      method: 'getTotalPooledBONE',
      config: STRATEGY_LAZY,
    });

  const [dao, operators, instantPool, staking] = data?.entityFees ?? [];

  const { data: status, initialLoading: statusLoading } = useStakingInfoState();

  const loading = useMemo(
    () => ({
      feesLoading: initialLoading,
      statusLoading,
      totalPooledLoading: totalPooledLoading,
    }),
    [totalPooledLoading, initialLoading, statusLoading],
  );

  const baseData = useMemo(() => {
    return {
      protocolFee: data?.protocolFee,
      isPaused: status?.isStakingPaused,
      totalPooled: totalPooledBone,
      feeDistribution: {
        staking,
        dao,
        instantPool,
        operators,
      },
    };
  }, [
    dao,
    data?.protocolFee,
    instantPool,
    operators,
    staking,
    status?.isStakingPaused,
    totalPooledBone,
  ]);

  return {
    ...baseData,
    loading,
  };
};
