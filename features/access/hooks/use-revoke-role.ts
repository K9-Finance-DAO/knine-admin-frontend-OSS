import { useCurrentStaticRpcProvider } from 'shared/hooks';
import { useSDK } from '@knine-sdk/react';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';
import { getFeeData } from 'utils/getFeeData';
import { getTxHash, runWithTransactionLogger } from 'utils';
import { getKnBoneContract } from '@knine-sdk/contracts';
import { useAccessDataContext } from '../provider';

export const useRevokeRole = (contractAddress?: string) => {
  const { updateAccessData } = useAccessDataContext();
  const { providerWeb3, account } = useSDK();
  const { txModalStages } = useTxModalGeneralStages();
  const { isMultisig } = useIsMultisig();
  const { staticRpcProvider } = useCurrentStaticRpcProvider();

  return useCallback(
    async (role: string, address: string) => {
      invariant(contractAddress, 'useRevokeRole: contractAddress not defined');
      invariant(providerWeb3, 'useRevokeRole: providerWeb3 not defined');
      invariant(account, 'useRevokeRole: account not defined');

      txModalStages.sign();

      try {
        // NOTE: using one of contract instances because all contract in this scope have "revokeRole" method
        const contractWeb3 = getKnBoneContract(
          contractAddress,
          providerWeb3.getSigner(),
        );

        const callback = async () => {
          const overrides = {
            from: account,
          };
          if (isMultisig) {
            const tx = await contractWeb3.populateTransaction.revokeRole(
              role,
              address,
              overrides,
            );
            return providerWeb3.getSigner().sendUncheckedTransaction(tx);
          } else {
            const { maxFeePerGas, maxPriorityFeePerGas } =
              await getFeeData(staticRpcProvider);
            const options = {
              maxPriorityFeePerGas,
              maxFeePerGas,
            };
            const gasLimit = await contractWeb3.estimateGas.revokeRole(
              role,
              address,
              { ...overrides, ...options },
            );
            return contractWeb3.revokeRole(role, address, {
              ...overrides,
              gasLimit,
            });
          }
        };

        const tx = await runWithTransactionLogger(
          'Revoke admin role',
          callback,
        );
        const txHash = getTxHash(tx);

        if (isMultisig) {
          txModalStages.successMultisig();
          return true;
        }

        txModalStages.pending(txHash);

        if (typeof tx === 'object') {
          await runWithTransactionLogger('Revoke admin role confirmation', () =>
            tx.wait(),
          );
        }

        await updateAccessData();

        txModalStages.success(txHash);
        return true;
      } catch (err: unknown) {
        txModalStages.failed(err);
        return false;
      }
    },
    [
      account,
      contractAddress,
      isMultisig,
      providerWeb3,
      staticRpcProvider,
      txModalStages,
      updateAccessData,
    ],
  );
};
