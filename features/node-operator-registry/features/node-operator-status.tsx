import { StatusToggleBox } from 'shared/components';
import { useNodeOperatorRegistryContractWeb3 } from '@knine-sdk/react';
import { useChainId, useToggleContractPause } from 'shared/hooks';
import { memo } from 'react';
import { useNodeOperatorRegistryStats } from '../form/hooks';

export const NodeOperatorStatus = memo(() => {
  const { chainId } = useChainId();
  const { data, initialLoading, update } = useNodeOperatorRegistryStats();

  const { status, togglePause } = useToggleContractPause({
    isPaused: data?.isNodeOperatorPaused,
    contractWeb3: useNodeOperatorRegistryContractWeb3(chainId),
    onSuccess: update,
  });

  return (
    <StatusToggleBox
      chainId={chainId}
      status={status}
      loading={initialLoading}
      onSwitch={togglePause}
      title="Node Operator Registry status"
    />
  );
});

NodeOperatorStatus.displayName = 'NodeOperatorStatus';
