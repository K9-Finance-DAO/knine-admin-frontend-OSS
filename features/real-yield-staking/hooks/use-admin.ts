import { useClientConfig } from 'providers/client-config';
import {
  useRealYieldStakingContractRPC,
  useSDK,
  useWrapperSWR,
} from '@knine-sdk/react';
import { RealYieldStakingAbi } from '@knine-sdk/contracts';

type RealYieldStakingAdmin = {
  isDefaultAdmin: boolean;
  isAdmin: boolean;
};

export const useRealYieldStakingAdmin = () => {
  const { defaultChain } = useClientConfig();
  const { account } = useSDK();
  const realYieldStaking = useRealYieldStakingContractRPC(defaultChain);

  return useWrapperSWR<RealYieldStakingAdmin>(
    ['swr-real-yield-staking-admins', realYieldStaking],
    // @ts-expect-error broken lidoSWR typings
    async (_key: string, realYieldStaking: RealYieldStakingAbi) => {
      const defaultAdminRole = await realYieldStaking.DEFAULT_ADMIN_ROLE();
      const adminRole = await realYieldStaking.ADMIN_ROLE();
      const [isDefaultAdmin, isAdmin] = await Promise.all([
        realYieldStaking.hasRole(defaultAdminRole, account || ''),
        realYieldStaking.hasRole(adminRole, account || ''),
      ]);

      return {
        isDefaultAdmin,
        isAdmin,
      };
    },
  );
};
