import { StatusToggleBox } from 'shared/components';
import { useKnBoneContractWeb3 } from '@knine-sdk/react';
import {
  useChainId,
  useStakingInfoState,
  useToggleContractPause,
} from 'shared/hooks';
import { memo } from 'react';

export const StakingStatus = memo(() => {
  const { chainId } = useChainId();
  const { data, initialLoading, update } = useStakingInfoState();

  const { status, togglePause } = useToggleContractPause({
    isPaused: data?.isStakingPaused,
    contractWeb3: useKnBoneContractWeb3(),
    onSuccess: update,
  });

  return (
    <StatusToggleBox
      chainId={chainId}
      status={status}
      loading={initialLoading}
      onSwitch={togglePause}
      title="Liquid Staking status"
      sx={{ width: '60%' }}
    />
  );
});

StakingStatus.displayName = 'StakingStatus';
