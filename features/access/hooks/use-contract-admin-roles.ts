import { useSDK, useWrapperSWR } from '@knine-sdk/react';
import {
  CHAINS,
  getFarmingFactoryAddress,
  getInstantPoolAddress,
  getNodeOperatorRegistryAddress,
  getRealYieldStakingAddress,
  getTokenAddress,
  getVestingAddress,
  TOKENS,
} from '@knine-sdk/constants';
import {
  getFarmingFactoryContract,
  getInstantPoolContract,
  getKnBoneContract,
  getNodeOperatorRegistryContract,
  getRealYieldStakingContract,
  getShibariumKnBoneContract,
  getVestingContract,
} from '@knine-sdk/contracts';
import { useChainId } from 'shared/hooks';
import invariant from 'tiny-invariant';
import { AdminRole } from '../types';
import { useCallback } from 'react';
import { STRATEGY_CONSTANT } from '../../../utils';

export enum AccessContractType {
  liquidStaking = 'Liquid staking',
  nodeOperatorRegistry = 'NodeOperatorRegistry',
  shibariumKnBone = 'Shibarium/knBONE',
  instantPool = 'InstantPool',
  farmingFactory = 'FarmingFactory',
  realYieldStaking = 'RealYieldStaking',
  vesting = 'Vesting',
}

export type AccessContractData = {
  contractAddress: string;
  chainId: number;
  adminRoles: AdminRole;
};

export const useContractAdminRoles = (contractType: AccessContractType) => {
  const { chainId, defaultChain, currentChainId } = useChainId();
  const { account } = useSDK();
  const { providerWeb3, providerRpc, findProviderByChainId } = useSDK();

  const getProviderByCurrentChainId = useCallback(
    (chainId: CHAINS) => {
      const { provider } = findProviderByChainId(chainId);
      if (currentChainId === chainId && providerWeb3) {
        return providerWeb3;
      } else if (provider) {
        return provider;
      }
      return providerRpc;
    },
    [currentChainId, findProviderByChainId, providerRpc, providerWeb3],
  );

  return useWrapperSWR<AccessContractData>(
    providerRpc && providerWeb3 && account
      ? [`swr-contract-admin-roles-${account}`, contractType, providerWeb3]
      : null,
    async () => {
      invariant(providerRpc, 'useContractAdminRoles: providerRpc not defined');
      invariant(
        providerWeb3,
        'useContractAdminRoles: providerWeb3 not defined',
      );
      switch (contractType) {
        case AccessContractType.liquidStaking: {
          const contractAddress = getTokenAddress(chainId, TOKENS.KNBONE);
          const provider = getProviderByCurrentChainId(chainId);
          const contract = getKnBoneContract(contractAddress, provider);
          const [
            defaultAdminRole,
            bridgeRole,
            daoRole,
            pauseRole,
            unpauseRole,
          ] = await Promise.all([
            contract.DEFAULT_ADMIN_ROLE(),
            contract.BRIDGE_ROLE(),
            contract.DAO_ROLE(),
            contract.PAUSE_ROLE(),
            contract.UNPAUSE_ROLE(),
          ]);
          return {
            contractAddress: contractAddress,
            chainId,
            adminRoles: {
              DEFAULT_ADMIN_ROLE: defaultAdminRole,
              BRIDGE_ROLE: bridgeRole,
              DAO_ROLE: daoRole,
              PAUSE_ROLE: pauseRole,
              UNPAUSE_ROLE: unpauseRole,
            },
          };
        }
        case AccessContractType.nodeOperatorRegistry: {
          const contractAddress = getNodeOperatorRegistryAddress(chainId);
          const provider = getProviderByCurrentChainId(chainId);
          const contract = getNodeOperatorRegistryContract(
            contractAddress,
            provider,
          );
          const [
            defaultAdminRole,
            daoRole,
            pauseRole,
            unpauseRole,
            addNodeOperatorRole,
            removeNodeOperatorRole,
          ] = await Promise.all([
            contract.DEFAULT_ADMIN_ROLE(),
            contract.DAO_ROLE(),
            contract.PAUSE_ROLE(),
            contract.UNPAUSE_ROLE(),
            contract.ADD_NODE_OPERATOR_ROLE(),
            contract.REMOVE_NODE_OPERATOR_ROLE(),
          ]);
          return {
            contractAddress,
            chainId,
            adminRoles: {
              DEFAULT_ADMIN_ROLE: defaultAdminRole,
              DAO_ROLE: daoRole,
              PAUSE_ROLE: pauseRole,
              UNPAUSE_ROLE: unpauseRole,
              ADD_NODE_OPERATOR_ROLE: addNodeOperatorRole,
              REMOVE_NODE_OPERATOR_ROLE: removeNodeOperatorRole,
            },
          };
        }
        case AccessContractType.shibariumKnBone: {
          const contractAddress = getTokenAddress(defaultChain, TOKENS.KNBONE);
          const provider = getProviderByCurrentChainId(defaultChain);
          const contract = getShibariumKnBoneContract(
            contractAddress,
            provider,
          );
          const [
            defaultAdminRole,
            burnerRole,
            minterRole,
            pauseRole,
            unpauseRole,
          ] = await Promise.all([
            contract.DEFAULT_ADMIN_ROLE(),
            contract.BURNER_ROLE(),
            contract.MINTER_ROLE(),
            contract.PAUSE_ROLE(),
            contract.UNPAUSE_ROLE(),
          ]);
          return {
            contractAddress: contractAddress,
            chainId: defaultChain,
            adminRoles: {
              DEFAULT_ADMIN_ROLE: defaultAdminRole,
              BURNER_ROLE: burnerRole,
              MINTER_ROLE: minterRole,
              PAUSE_ROLE: pauseRole,
              UNPAUSE_ROLE: unpauseRole,
            },
          };
        }
        case AccessContractType.instantPool: {
          const contractAddress = getInstantPoolAddress(chainId);
          const provider = getProviderByCurrentChainId(chainId);
          const contract = getInstantPoolContract(contractAddress, provider);
          const [defaultAdminRole, withdrawerRole, pauseRole, unpauseRole] =
            await Promise.all([
              contract.DEFAULT_ADMIN_ROLE(),
              contract.WITHDRAWER_ROLE(),
              contract.PAUSE_ROLE(),
              contract.UNPAUSE_ROLE(),
            ]);
          return {
            contractAddress,
            chainId,
            adminRoles: {
              DEFAULT_ADMIN_ROLE: defaultAdminRole,
              WITHDRAWER_ROLE: withdrawerRole,
              PAUSE_ROLE: pauseRole,
              UNPAUSE_ROLE: unpauseRole,
            },
          };
        }
        case AccessContractType.farmingFactory: {
          const contractAddress = getFarmingFactoryAddress(defaultChain);
          const provider = getProviderByCurrentChainId(defaultChain);
          const contract = getFarmingFactoryContract(contractAddress, provider);
          const [defaultAdminRole, adminRole] = await Promise.all([
            contract.DEFAULT_ADMIN_ROLE(),
            contract.ADMIN_ROLE(),
          ]);
          return {
            contractAddress,
            chainId: defaultChain,
            adminRoles: {
              DEFAULT_ADMIN_ROLE: defaultAdminRole,
              ADMIN_ROLE: adminRole,
            },
          };
        }
        case AccessContractType.realYieldStaking: {
          const contractAddress = getRealYieldStakingAddress(defaultChain);
          const provider = getProviderByCurrentChainId(defaultChain);
          const contract = getRealYieldStakingContract(
            contractAddress,
            provider,
          );
          const [defaultAdminRole, adminRole] = await Promise.all([
            contract.DEFAULT_ADMIN_ROLE(),
            contract.ADMIN_ROLE(),
          ]);
          return {
            contractAddress,
            chainId: defaultChain,
            adminRoles: {
              DEFAULT_ADMIN_ROLE: defaultAdminRole,
              ADMIN_ROLE: adminRole,
            },
          };
        }
        case AccessContractType.vesting: {
          const contractAddress = getVestingAddress(defaultChain);
          const provider = getProviderByCurrentChainId(defaultChain);
          const contract = getVestingContract(contractAddress, provider);
          const [defaultAdminRole, adminRole] = await Promise.all([
            contract.DEFAULT_ADMIN_ROLE(),
            contract.ADMIN_ROLE(),
          ]);
          return {
            contractAddress,
            chainId: defaultChain,
            adminRoles: {
              DEFAULT_ADMIN_ROLE: defaultAdminRole,
              ADMIN_ROLE: adminRole,
            },
          };
        }
        default: {
          return {
            contractAddress: '',
            chainId,
            adminRoles: {} as AdminRole,
          };
        }
      }
    },
    {
      ...STRATEGY_CONSTANT,
      shouldRetryOnError: false,
      revalidateOnReconnect: true,
    },
  );
};
