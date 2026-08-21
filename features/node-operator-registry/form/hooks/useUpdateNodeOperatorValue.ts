import { useNodeOperatorRegistryContractWeb3, useSDK } from '@knine-sdk/react';
import { useExecuteContractMethod, useChainId } from 'shared/hooks';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { useCallback } from 'react';
import { NodeOperatorRegistryAbi } from '@knine-sdk/contracts';
import invariant from 'tiny-invariant';
import { getTxHash, runWithTransactionLogger } from 'utils';
type useUpdateNodeOperatorValueProps = {
  onConfirm?: () => Promise<void> | void;
};

export const useUpdateNodeOperatorValue = ({
  onConfirm,
}: useUpdateNodeOperatorValueProps) => {
  const { chainId } = useChainId();
  const { providerWeb3 } = useSDK();
  const contractWeb3 = useNodeOperatorRegistryContractWeb3(chainId);

  const { txModalStages } = useTxModalGeneralStages();
  const { isMultisig } = useIsMultisig();

  const processTx = useExecuteContractMethod<NodeOperatorRegistryAbi>();

  return useCallback(
    async <T extends keyof NodeOperatorRegistryAbi['functions']>(
      method: T,
      params: Parameters<NodeOperatorRegistryAbi['functions'][T]>,
    ): Promise<boolean> => {
      invariant(
        contractWeb3,
        'useUpdateNodeOperatorValue: contractWeb3 not defined',
      );
      invariant(
        providerWeb3,
        'useUpdateNodeOperatorValue: providerWeb3 not defined',
      );

      txModalStages.sign();

      try {
        const tx = await runWithTransactionLogger(
          'Toggle pause',
          processTx({ providerWeb3, contractWeb3, method, params }),
        );
        const txHash = getTxHash(tx);

        if (isMultisig) {
          txModalStages.successMultisig();
          return true;
        }

        txModalStages.pending(txHash);

        if (typeof tx === 'object') {
          await runWithTransactionLogger(
            'NodeOperatorRegistryAbi confirmation',
            async () => tx.wait(),
          );
        }
        await onConfirm?.();

        txModalStages.success(txHash);
        return true;
      } catch (err: unknown) {
        txModalStages.failed(err);
        return false;
      }
    },
    [contractWeb3, isMultisig, processTx, providerWeb3, txModalStages],
  );
};
