import { StatusToggleBox } from 'shared/components';
import { useChainId, useToggleContractPause } from 'shared/hooks';
import {
  useContractSWR,
  useKnBoneContractRPC,
  useKnBoneContractWeb3,
} from '@knine-sdk/react';
import { STRATEGY_CONSTANT } from 'utils';

export const ShibariumTokenStatus = () => {
  const { defaultChain } = useChainId();
  const {
    data: isInstantPoolPaused,
    initialLoading,
    update,
  } = useContractSWR({
    contract: useKnBoneContractRPC(defaultChain),
    method: 'paused',
    config: STRATEGY_CONSTANT,
  });

  const { status, togglePause } = useToggleContractPause({
    isPaused: isInstantPoolPaused,
    contractWeb3: useKnBoneContractWeb3(),
    onSuccess: update,
  });
  return (
    <StatusToggleBox
      chainId={defaultChain}
      status={status}
      loading={initialLoading}
      onSwitch={togglePause}
      title="Shibarium knBONE token status"
      sx={{ width: '60%' }}
    />
  );
};
