import { useClientConfig } from 'providers/client-config';
import { useRealYieldStakingContractWeb3, useSDK } from '@knine-sdk/react';
import { useWeb3 } from 'rnb-web3/web3-react';
import { useTxModalStagesChangeRewardPerSecond } from './use-tx-modal-stages-change-rps';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';
import { isContract } from 'utils/isContract';
import { applyGasLimitRatio, getTxHash, runWithTransactionLogger } from 'utils';
import { parseEther } from '@ethersproject/units';

type ChangeRewardPerSecondArgs = {
  rewardPerSecond: number | string;
};

type ChangeRewardPerSecondOptions = {
  onConfirm?: () => Promise<void> | void;
  onRetry?: () => void;
};

export const useChangeRewardPerSecond = ({
  onConfirm,
  onRetry,
}: ChangeRewardPerSecondOptions) => {
  const { defaultChain: chainId } = useClientConfig();
  const realYieldStakingContractWeb3 = useRealYieldStakingContractWeb3(chainId);
  const { account } = useWeb3();
  const { providerWeb3, providerRpc } = useSDK();
  const { txModalStages } = useTxModalStagesChangeRewardPerSecond();

  return {
    changeRewardPerSecond: useCallback(
      async ({
        rewardPerSecond,
      }: ChangeRewardPerSecondArgs): Promise<boolean> => {
        try {
          invariant(rewardPerSecond, 'rewardPerSecond is null');
          invariant(chainId, 'chainId is not defined');
          invariant(account, 'account is not defined');
          invariant(providerWeb3, 'providerWeb3 not defined');
          invariant(
            realYieldStakingContractWeb3,
            'realYieldStakingContract is not defined',
          );

          const isMultisig = await isContract(account, providerRpc);

          const parsedRpc = parseEther(rewardPerSecond.toString());

          txModalStages.sign(parsedRpc);

          const callback = async () => {
            const overrides = {
              from: account,
            };
            if (isMultisig) {
              const tx =
                await realYieldStakingContractWeb3.populateTransaction.setRPS(
                  parsedRpc,
                  overrides,
                );
              return providerWeb3.getSigner().sendUncheckedTransaction(tx);
            } else {
              const originalGasLimit =
                await realYieldStakingContractWeb3.estimateGas.setRPS(
                  parsedRpc,
                  overrides,
                );
              const gasLimit = applyGasLimitRatio(originalGasLimit);
              return realYieldStakingContractWeb3.setRPS(parsedRpc, {
                ...overrides,
                gasLimit,
              });
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

          txModalStages.pending(parsedRpc, txHash);

          if (typeof tx === 'object') {
            await runWithTransactionLogger(
              'Change multiplier block confirmation',
              () => tx.wait(),
            );
          }

          await onConfirm?.();

          txModalStages.success(parsedRpc, txHash);
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
