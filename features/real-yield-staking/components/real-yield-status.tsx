import { useRealYieldStakingInfo } from '../hooks';
import { ContractStatus, StatusSwitch } from 'shared/components';
import { useMemo } from 'react';

export const RealYieldStatus = () => {
  const { data } = useRealYieldStakingInfo();

  const realYieldStakingStatus: ContractStatus | undefined = useMemo(() => {
    if (data?.poolInfo) {
      return data.poolInfo.startTime && data.poolInfo.endTime === 0
        ? 'Live'
        : 'Paused';
    }
    return undefined;
  }, [data?.poolInfo]);

  return (
    <StatusSwitch
      title="Real Yield Staking status"
      status={realYieldStakingStatus}
      inactiveStatusText="Stopped"
    />
  );
};
