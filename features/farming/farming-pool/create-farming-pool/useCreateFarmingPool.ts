import { useSDK } from '@knine-sdk/react';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';
import { getTxHash, runWithTransactionLogger, standardFetcher } from 'utils';
import {
  CretePoolResponse,
  formatBackendData,
  type FarmingPoolFormFields,
} from 'features/farming/farming-pool/shared';
import { dynamics } from 'config';

export class BackendFarmingCreationError extends Error {
  reason: string;

  constructor(message: any) {
    super(message);
    this.reason = message;
  }
}

const callBackend = async (data: FarmingPoolFormFields) => {
  try {
    const url = dynamics.knineAPIBasePath;
    console.log('Formatting data for backend...');
    const serializedData = await formatBackendData(data);
    console.log('Serialized data:', JSON.stringify(serializedData, null, 2));

    console.log(`Making POST request to: ${url}/farming-pools/create/`);
    const response = await standardFetcher<CretePoolResponse>(
      `${url}/farming-pools/create/`,
      {
        body: JSON.stringify(serializedData),
        method: 'POST',
      },
    );

    return response;
  } catch (err) {
    console.error('Backend call failed:', err);
    throw new BackendFarmingCreationError(err);
  }
};

type useCallStakingSettingsMethodProps = {
  onConfirm?: () => Promise<void> | void;
};

export const useCreateFarmingPool = ({
  onConfirm,
}: useCallStakingSettingsMethodProps) => {
  const { providerWeb3 } = useSDK();
  const { txModalStages } = useTxModalGeneralStages();
  const { isMultisig } = useIsMultisig();

  return useCallback(
    async (data: FarmingPoolFormFields): Promise<boolean> => {
      invariant(providerWeb3, 'useCreateFarmingPool: providerWeb3 not defined');

      txModalStages.sign();

      try {
        console.log(
          'Creating farming pool with data:',
          JSON.stringify(data, null, 2),
        );
        const response = await callBackend(data);
        console.log('Backend response received:', response);

        const callback = async () => {
          const tx = {
            data: response.initial_tx?.data,
            gasPrice: response.initial_tx?.gasPrice,
            gasLimit: response.initial_tx?.gasLimit,
            nonce: response.initial_tx?.nonce,
            to: response.initial_tx?.to,
            value: response.initial_tx?.value,
            from: response.initial_tx?.from,
          };

          if (isMultisig) {
            return providerWeb3.getSigner().sendUncheckedTransaction(tx);
          }

          return providerWeb3.getSigner().sendTransaction(tx);
        };

        const tx = await runWithTransactionLogger(
          'useCreateFarmingPool callback',
          callback,
        );
        const txHash = getTxHash(tx);

        if (isMultisig) {
          txModalStages.successMultisig();
          return true;
        }

        txModalStages.pending(txHash);

        if (typeof tx === 'object') {
          await runWithTransactionLogger('useCreateFarmingPool', async () =>
            tx.wait(),
          );
        }

        await onConfirm?.();

        txModalStages.success(txHash);

        return true;
      } catch (err: unknown) {
        console.error('Farm creation failed:', err);
        console.error('Error details:', {
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : undefined,
          data: JSON.stringify(data, null, 2),
        });
        txModalStages.failed(err);
        return false;
      }
    },
    [isMultisig, onConfirm, providerWeb3, txModalStages],
  );
};
