import { useExecuteContractMethod, useChainId } from 'shared/hooks';
import { useSDK, useVestingContractWeb3 } from '@knine-sdk/react';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';
import { getTxHash, runWithTransactionLogger } from 'utils';

export const useEmergencyStop = () => {
  const { defaultChain } = useChainId();
  const contractWeb3 = useVestingContractWeb3(defaultChain);
  const { providerWeb3 } = useSDK();
  const { txModalStages } = useTxModalGeneralStages();
  const { isMultisig } = useIsMultisig();
  const processTx = useExecuteContractMethod();

  return useCallback(async (): Promise<boolean> => {
    invariant(contractWeb3, 'useEmergencyStop: contractWeb3 not defined');
    invariant(providerWeb3, 'useEmergencyStop: providerWeb3 not defined');

    txModalStages.sign();

    try {
      const tx = await runWithTransactionLogger(
        'emergency stop',
        processTx({
          providerWeb3,
          contractWeb3,
          method: 'emergencyStop',
          params: [],
        }),
      );
      const txHash = getTxHash(tx);

      if (isMultisig) {
        txModalStages.successMultisig();
        return true;
      }

      txModalStages.pending(txHash);

      if (typeof tx === 'object') {
        await runWithTransactionLogger('useEmergencyStop', async () =>
          tx.wait(),
        );
      }

      txModalStages.success(txHash);
      return true;
    } catch (err: unknown) {
      txModalStages.failed(err);
      return false;
    }
  }, [contractWeb3, isMultisig, processTx, providerWeb3, txModalStages]);
};
