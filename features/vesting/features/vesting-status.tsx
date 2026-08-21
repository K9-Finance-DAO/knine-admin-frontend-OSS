import { Stack } from '@mui/material';
import { StatusToggleBox } from 'shared/components';
import { useChainId, useToggleContractPause } from 'shared/hooks';
import { memo } from 'react';
import { useVestingContractValues } from 'features/vesting/hooks';
import { useVestingContractWeb3 } from '@knine-sdk/react';

export const VestingStatus = memo(() => {
  const { defaultChain } = useChainId();
  const { data, initialLoading, update } = useVestingContractValues();

  const { status, togglePause } = useToggleContractPause({
    isPaused: data?.isVestingPaused,
    contractWeb3: useVestingContractWeb3(defaultChain),
    onSuccess: update,
  });

  return (
    <Stack direction="row" spacing={2} width="100%">
      <StatusToggleBox
        key={`status-${status}`}
        chainId={defaultChain}
        status={status}
        loading={initialLoading}
        onSwitch={togglePause}
        title="Vesting status"
      />
      <StatusToggleBox
        key={`locked-only${!!data?.lockedOnly}`}
        chainId={defaultChain}
        status={data?.lockedOnly ? 'active' : 'inactive'}
        loading={initialLoading}
        onSwitch={() => togglePause('changeIsOnlyLocked')}
        booleanStatus
        title="Locked only"
      />
    </Stack>
  );
});

VestingStatus.displayName = 'VestingStatus';
