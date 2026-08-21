import { useKnBoneContractWeb3, useSDK } from '@knine-sdk/react';
import { useExecuteContractMethod, useChainId } from 'shared/hooks';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { useCallback } from 'react';
import { KnboneAbi } from '@knine-sdk/contracts';
import invariant from 'tiny-invariant';
import { getTxHash, runWithTransactionLogger } from 'utils';

type useCallStakingSettingsMethodProps = {
  onConfirm?: () => Promise<void> | void;
};

export const useCallStakingSettingsMethod = ({
  onConfirm,
}: useCallStakingSettingsMethodProps) => {
  const { chainId } = useChainId();
  const contractWeb3 = useKnBoneContractWeb3(chainId);
  const { providerWeb3 } = useSDK();
  const { txModalStages } = useTxModalGeneralStages();
  const { isMultisig } = useIsMultisig();
  const processTx = useExecuteContractMethod<KnboneAbi>();

  return useCallback(
    async <T extends keyof KnboneAbi['functions']>(
      method: T,
      params: Parameters<KnboneAbi['functions'][T]>,
    ): Promise<boolean> => {
      invariant(
        contractWeb3,
        'useCallStakingSettingsMethod: contractWeb3 not defined',
      );
      invariant(
        providerWeb3,
        'useCallStakingSettingsMethod: providerWeb3 not defined',
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
            'useCallStakingSettingsMethod',
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
