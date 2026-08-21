import { useSDK, useVestingContractWeb3 } from '@knine-sdk/react';
import { useExecuteContractMethod, useChainId } from 'shared/hooks';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { useCallback } from 'react';
import { VestingAbi } from '@knine-sdk/contracts';
import invariant from 'tiny-invariant';
import { getTxHash, runWithTransactionLogger } from 'utils';

type useUpdateVestingValueProps = {
  onConfirm?: () => Promise<void> | void;
};

export const useUpdateVestingValue = ({
  onConfirm,
}: useUpdateVestingValueProps) => {
  const { defaultChain } = useChainId();
  const { providerWeb3 } = useSDK();
  const contractWeb3 = useVestingContractWeb3(defaultChain);
  const { isMultisig } = useIsMultisig();

  const { txModalStages } = useTxModalGeneralStages();

  const processTx = useExecuteContractMethod<VestingAbi>();

  return useCallback(
    async <T extends keyof VestingAbi['functions']>(
      method: T,
      params: Parameters<VestingAbi['functions'][T]>,
    ): Promise<boolean> => {
      invariant(
        contractWeb3,
        'useUpdateVestingValue: contractWeb3 not defined',
      );
      invariant(
        providerWeb3,
        'useUpdateVestingValue: providerWeb3 not defined',
      );

      txModalStages.sign();

      try {
        const tx = await runWithTransactionLogger(
          'vesting update',
          processTx({ providerWeb3, contractWeb3, method, params }),
        );
        const txHash = getTxHash(tx);

        if (isMultisig) {
          txModalStages.successMultisig();
          return true;
        }

        txModalStages.pending(txHash);

        if (typeof tx === 'object') {
          await runWithTransactionLogger('VestingAbi confirmation', async () =>
            tx.wait(),
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
