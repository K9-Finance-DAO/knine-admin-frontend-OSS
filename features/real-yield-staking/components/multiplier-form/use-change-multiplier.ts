import { useClientConfig } from 'providers/client-config';
import { useRealYieldStakingContractWeb3, useSDK } from '@knine-sdk/react';
import { useWeb3 } from 'rnb-web3/web3-react';
import { useTxModalStagesChangeMultiplier } from './use-tx-modal-stages-change-multiplier';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';
import { isContract } from 'utils/isContract';
import { applyGasLimitRatio, getTxHash, runWithTransactionLogger } from 'utils';
import { parseEther } from '@ethersproject/units';

type ChangeMultiplierArgs = {
  multiplier: number;
};

type ChangeMultiplierOptions = {
  onConfirm?: () => Promise<void> | void;
  onRetry?: () => void;
};

export const useChangeMultiplier = ({
  onConfirm,
  onRetry,
}: ChangeMultiplierOptions) => {
  const { defaultChain: chainId } = useClientConfig();
  const realYieldStakingContractWeb3 = useRealYieldStakingContractWeb3(chainId);
  const { account } = useWeb3();
  const { providerWeb3, providerRpc } = useSDK();
  const { txModalStages } = useTxModalStagesChangeMultiplier();

  return {
    changeMultiplier: useCallback(
      async ({ multiplier }: ChangeMultiplierArgs): Promise<boolean> => {
        try {
          invariant(multiplier, 'multiplier is null');
          invariant(chainId, 'chainId is not defined');
          invariant(account, 'account is not defined');
          invariant(providerWeb3, 'providerWeb3 not defined');
          invariant(
            realYieldStakingContractWeb3,
            'realYieldStakingContract is not defined',
          );

          const isMultisig = await isContract(account, providerRpc);

          const parsedMultiplier = parseEther(multiplier.toString());

          txModalStages.sign(parsedMultiplier);

          const callback = async () => {
            const overrides = {
              from: account,
            };
            if (isMultisig) {
              const tx =
                await realYieldStakingContractWeb3.populateTransaction.setMaxMultiplier(
                  parsedMultiplier,
                  overrides,
                );
              return providerWeb3.getSigner().sendUncheckedTransaction(tx);
            } else {
              const originalGasLimit =
                await realYieldStakingContractWeb3.estimateGas.setMaxMultiplier(
                  parsedMultiplier,
                  overrides,
                );
              const gasLimit = applyGasLimitRatio(originalGasLimit);
              return realYieldStakingContractWeb3.setMaxMultiplier(
                parsedMultiplier,
                {
                  ...overrides,
                  gasLimit,
                },
              );
            }
          };

          const tx = await runWithTransactionLogger(
            `Change max lockup multiplier signing`,
            callback,
          );
          const txHash = getTxHash(tx);

          if (isMultisig) {
            txModalStages.successMultisig();
            return true;
          }

          txModalStages.pending(parsedMultiplier, txHash);

          if (typeof tx === 'object') {
            await runWithTransactionLogger(
              'Change multiplier block confirmation',
              () => tx.wait(),
            );
          }

          await onConfirm?.();

          txModalStages.success(parsedMultiplier, txHash);
          return true;
        } catch (error) {
          console.warn(error);
          txModalStages.failed(error, onRetry);
          return false;
        }
      },
      [
        account,
        chainId,
        onConfirm,
        onRetry,
        providerRpc,
        providerWeb3,
        realYieldStakingContractWeb3,
        txModalStages,
      ],
    ),
  };
};
