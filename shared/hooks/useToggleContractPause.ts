import { Status } from 'shared/components';
import { BaseContract, ContractTransaction, Overrides } from 'ethers';
import { useWeb3 } from 'rnb-web3/web3-react';
import { useSDK } from '@knine-sdk/react';
import { useCurrentStaticRpcProvider } from './use-current-static-rpc-provider';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from './useIsMultisig';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';
import { getFeeData } from 'utils/getFeeData';
import { getTxHash, runWithTransactionLogger } from 'utils';

type ReturnType = {
  status: Status;
  togglePause: (pausableMethod?: string) => Promise<boolean>;
};

type UseTogglePauseProps<C extends BaseContract> = {
  isPaused?: boolean;
  contractWeb3: C | null;
  onSuccess?: () => Promise<any>;
};

interface PausableContract extends BaseContract {
  pause(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;
  unpause(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;
}

export const useToggleContractPause = <C extends PausableContract>(
  props: UseTogglePauseProps<C>,
): ReturnType => {
  const { isPaused, contractWeb3, onSuccess } = props;
  const { account } = useWeb3();
  const { providerWeb3 } = useSDK();
  const { staticRpcProvider } = useCurrentStaticRpcProvider();
  const { txModalStages } = useTxModalGeneralStages();
  const { isMultisig } = useIsMultisig();

  return {
    status: isPaused ? 'inactive' : 'active',
    togglePause: useCallback(
      async (pausableMethodName) => {
        try {
          invariant(contractWeb3, 'toggle pause: contractWeb3 not defined');
          invariant(providerWeb3, 'toggle pause: providerWeb3 not defined');

          txModalStages.sign();
          const defaultPauseMethod = isPaused ? 'unpause' : 'pause';
          const method = pausableMethodName ?? defaultPauseMethod;

          const processTx = async () => {
            if (isMultisig) {
              const tx = await contractWeb3.populateTransaction[method]({
                from: account,
              });
              return providerWeb3.getSigner().sendUncheckedTransaction(tx);
            } else {
              const { maxFeePerGas, maxPriorityFeePerGas } =
                await getFeeData(staticRpcProvider);

              const options = {
                maxPriorityFeePerGas,
                maxFeePerGas,
              };

              const gasLimit = await contractWeb3.estimateGas[method](options);

              // @ts-expect-error fixlater
              return contractWeb3[method]({
                ...options,
                gasLimit,
              });
            }
          };

          const tx = await runWithTransactionLogger('Toggle pause', processTx);
          const txHash = getTxHash(tx);

          if (isMultisig) {
            txModalStages.successMultisig();
            return true;
          }

          txModalStages.pending(txHash);

          if (typeof tx === 'object') {
            await runWithTransactionLogger(
              'Claim block confirmation',
              async () => tx.wait(),
            );
          }

          txModalStages.success(txHash);

          await onSuccess?.();
          return true;
        } catch (err: unknown) {
          txModalStages.failed(err);
          return false;
        }
      },
      [
        account,
        contractWeb3,
        isMultisig,
        isPaused,
        onSuccess,
        providerWeb3,
        staticRpcProvider,
        txModalStages,
      ],
    ),
  };
};
