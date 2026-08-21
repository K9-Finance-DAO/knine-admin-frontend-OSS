import { StatusToggleBox } from 'shared/components';
import { useChainId, useToggleContractPause } from 'shared/hooks';
import {
  useContractSWR,
  useInstantPoolContractRPC,
  useInstantPoolContractWeb3,
} from '@knine-sdk/react';
import { STRATEGY_CONSTANT } from 'utils';
import { EditableInputGroupHookForm } from 'shared/hook-form/controls';

export const InstantPoolStatus = () => {
  const { chainId } = useChainId();
  const {
    data: isInstantPoolPaused,
    initialLoading,
    update,
  } = useContractSWR({
    contract: useInstantPoolContractRPC(chainId),
    method: 'paused',
    config: STRATEGY_CONSTANT,
  });

  const { status, togglePause } = useToggleContractPause({
    isPaused: isInstantPoolPaused,
    contractWeb3: useInstantPoolContractWeb3(chainId),
    onSuccess: update,
  });
  return (
    <StatusToggleBox
      chainId={chainId}
      status={status}
      loading={initialLoading}
      onSwitch={togglePause}
      title="InstantPool Status"
      sx={{ maxWidth: 466 }}
    >
      <EditableInputGroupHookForm
        fieldName="instantPoolUsageFee"
        placeholder="0"
        isNumeric
        percent
        label="Instant Pool Usage Fee"
        integer
        sx={{ mt: 1.5 }}
      />
    </StatusToggleBox>
  );
};
