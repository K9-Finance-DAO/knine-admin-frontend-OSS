import { useExecuteContractMethod, useChainId } from 'shared/hooks';
import { useFarmingFactoryContractWeb3, useSDK } from '@knine-sdk/react';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { FarmingFactoryAbi } from '@knine-sdk/contracts';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';
import { getTxHash, runWithTransactionLogger } from 'utils';

type useUpdateFormFieldProps = {
  poolAddress: string | undefined;
  onConfirm?: () => Promise<void> | void;
};

export const useUpdateFarmingViaContract = ({
  poolAddress,
  onConfirm,
}: useUpdateFormFieldProps) => {
  const { defaultChain } = useChainId();
  const { providerWeb3 } = useSDK();

  const { txModalStages } = useTxModalGeneralStages();
  const { isMultisig } = useIsMultisig();
  const contract = useFarmingFactoryContractWeb3(defaultChain);

  const metodsNeededAddress = new Set(['changeFarmingRPS', 'stopFarming']);

  const processTx = useExecuteContractMethod<FarmingFactoryAbi>();

  return useCallback(
    async <T extends keyof FarmingFactoryAbi['functions']>(
      method: T,
      params: Parameters<FarmingFactoryAbi['functions'][T]>,
    ): Promise<boolean> => {
      invariant(
        providerWeb3,
        'useUpdatePoolFormField: providerWeb3 not defined',
      );
      invariant(contract, 'useUpdatePoolFormField: contractWeb3 not defined');
      invariant(poolAddress, 'useUpdatePoolFormField: poolAddress not defined');

      try {
        txModalStages.sign();

        const contractParams = metodsNeededAddress.has(method)
          ? [poolAddress, ...params]
          : [...params];

        const tx = await runWithTransactionLogger(
          'useUpdatePoolFormField',
          processTx({
            providerWeb3,
            contractWeb3: contract,
            method,
            // @ts-expect-error fix types later
            params: contractParams,
          }),
        );
        const txHash = getTxHash(tx);

        if (isMultisig) {
          txModalStages.successMultisig();
          return true;
        }

        txModalStages.pending(txHash);

        if (typeof tx === 'object') {
          await runWithTransactionLogger(
            'useUpdatePoolFormField confirmation',
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
      contract,
      isMultisig,
      onConfirm,
      poolAddress,
      processTx,
      providerWeb3,
      txModalStages,
    ],
  );
};
