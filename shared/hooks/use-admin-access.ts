import { useRouter } from 'next/router';
import {
  FARMING_PATH,
  LIQUID_STAKING_PATH,
  NODE_OPERATOR_REGISTRY_PATH,
  REAL_YIELD_STAKING_PATH,
  SHIBARIUM_TOKEN_PATH,
  VESTING_PATH,
} from 'config/urls';
import { useSDK, useWrapperSWR } from '@knine-sdk/react';
import { STRATEGY_IMMUTABLE } from 'utils';
import {
  getFarmingFactoryAddress,
  getNodeOperatorRegistryAddress,
  getRealYieldStakingAddress,
  getTokenAddress,
  getVestingAddress,
  TOKENS,
} from '@knine-sdk/constants';
import { useAccountAdminRoles } from './use-account-admin-roles';
import invariant from 'tiny-invariant';
import { useChainId } from './useChainId';

const DEFAULT_ADMIN_ROLE = 'DEFAULT_ADMIN_ROLE';

type AdminAccess = {
  isDefaultAdmin: boolean;
  isAdmin: boolean;
};

export const useAdminAccess = () => {
  const { chainId, defaultChain } = useChainId();
  const { pathname } = useRouter();
  const { account, providerWeb3 } = useSDK();
  const { data: adminRoles } = useAccountAdminRoles();

  const getAdminRolesByContract = (contractAddress: string) => {
    return {
      isDefaultAdmin:
        !!adminRoles?.[contractAddress]?.includes(DEFAULT_ADMIN_ROLE),
      isAdmin: (adminRoles?.[contractAddress]?.length ?? 0) > 0,
    };
  };

  return useWrapperSWR<AdminAccess>(
    account && adminRoles && providerWeb3
      ? ['swr-admin-access', pathname, account]
      : null,
    async () => {
      invariant(account, 'account is not defined');
      invariant(adminRoles, 'adminRoles are not defined');
      invariant(providerWeb3, 'providerWeb3 is not defined');
      switch (pathname) {
        case LIQUID_STAKING_PATH: {
          const knBoneAddress = getTokenAddress(chainId, TOKENS.KNBONE);
          return getAdminRolesByContract(knBoneAddress);
        }
        case NODE_OPERATOR_REGISTRY_PATH: {
          const nodeOperatorRegistryContractAddress =
            getNodeOperatorRegistryAddress(chainId);
          return getAdminRolesByContract(nodeOperatorRegistryContractAddress);
        }
        case SHIBARIUM_TOKEN_PATH: {
          const knBoneAddress = getTokenAddress(defaultChain, TOKENS.KNBONE);
          return getAdminRolesByContract(knBoneAddress);
        }
        case REAL_YIELD_STAKING_PATH: {
          const realYieldStakingContractAddress =
            getRealYieldStakingAddress(defaultChain);
          return getAdminRolesByContract(realYieldStakingContractAddress);
        }
        case FARMING_PATH: {
          const farmingContractAddress = getFarmingFactoryAddress(defaultChain);
          return getAdminRolesByContract(farmingContractAddress);
        }
        case VESTING_PATH: {
          const vestingContractAddress = getVestingAddress(defaultChain);
          return getAdminRolesByContract(vestingContractAddress);
        }
        default: {
          return {
            isDefaultAdmin: true,
            isAdmin: true,
          };
        }
      }
    },
    STRATEGY_IMMUTABLE,
  );
};
