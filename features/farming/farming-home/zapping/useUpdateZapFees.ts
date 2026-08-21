import { useExecuteContractMethod, useChainId } from 'shared/hooks';
import { useFarmingFactoryContractWeb3, useSDK } from '@knine-sdk/react';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { FarmingFactoryAbi } from '@knine-sdk/contracts';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';
import { getTxHash, runWithTransactionLogger } from 'utils';

type useUpdateZapFeesProps = {
  onConfirm?: () => Promise<void> | void;
};

export const useUpdateZapFees = ({ onConfirm }: useUpdateZapFeesProps) => {
  const { defaultChain } = useChainId();
  const { providerWeb3 } = useSDK();
  const contractWeb3 = useFarmingFactoryContractWeb3(defaultChain);

  const { txModalStages } = useTxModalGeneralStages();
  const { isMultisig } = useIsMultisig();

  const processTx = useExecuteContractMethod<FarmingFactoryAbi>();

  return useCallback(
    async <T extends keyof FarmingFactoryAbi['functions']>(
      method: T,
      params: Parameters<FarmingFactoryAbi['functions'][T]>,
    ): Promise<boolean> => {
      invariant(contractWeb3, 'useUpdateZapFees: contractWeb3 not defined');
      invariant(providerWeb3, 'useUpdateZapFees: providerWeb3 not defined');

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
            'FarmingFactory confirmation',
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
    [
      contractWeb3,
      isMultisig,
      onConfirm,
      processTx,
      providerWeb3,
      txModalStages,
    ],
  );
};
