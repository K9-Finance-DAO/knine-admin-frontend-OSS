import { dynamics, MS_IN_SEC } from 'config';
import {
  getErrorMessage,
  getTxHash,
  runWithTransactionLogger,
  showToastMessage,
  standardFetcher,
  toDecimals,
  transformDataForBackend,
} from 'utils';
import { useCallback } from 'react';
import type {
  BonusPoolFields,
  CreateEditBonusPoolResponse,
  CurrentPool,
} from '../types';
import { getERC20Contract } from '@knine-sdk/contracts';
import { useFarmingFactoryContractRPC, useSDK } from '@knine-sdk/react';
import invariant from 'tiny-invariant';
import { useWeb3 } from 'rnb-web3/web3-react';
import { BigNumber } from 'ethers';
import { useTxModalGeneralStages } from 'shared/transaction-modal';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';

export type useSaveBonusPoolDataProps = {
  mainPoolAddress?: string;
  selectedPool: CurrentPool | null;
  onConfirm: (updateData?: boolean) => void;
};

const callApi = async (
  data: BonusPoolFields,
  poolAddress: string,
  poolId?: string | number | null,
) => {
  // todo @refactor this part, split into two func
  const apiPath = dynamics.knineAPIBasePath;

  const apiUrl = !poolId
    ? `${apiPath}/farming-pools/${poolAddress}/bonus-pools/create`
    : `${apiPath}/farming-pools/${poolAddress}/bonus-pools/${poolId}/`;

  const method = !poolId ? 'POST' : 'PATCH';

  const transformed = await transformDataForBackend(data);

  return await standardFetcher<CreateEditBonusPoolResponse>(apiUrl, {
    body: JSON.stringify(transformed),
    method,
  });
};

export const useCreateBonusPool = ({
  mainPoolAddress,
  onConfirm,
}: Omit<useSaveBonusPoolDataProps, 'selectedPool'>) => {
  const { providerWeb3 } = useSDK();
  const { account } = useWeb3();
  const { address: spenderAddress } = useFarmingFactoryContractRPC();
  const { txModalStages } = useTxModalGeneralStages();
  const { isMultisig } = useIsMultisig();

  return useCallback(
    async (data: BonusPoolFields) => {
      invariant(providerWeb3 != null, 'Web3 provider is required');
      invariant(account != null, 'account is required');

      if (!mainPoolAddress || !data?.endTime || !data?.startTime) {
        console.error('Not enough necessary data', {
          mainPoolAddress,
          endTime: data?.endTime,
          startTime: data?.startTime,
        });
        return false;
      }

      try {
        const {
          rps: rpsValue,
          rewardToken,
          startTime: startTimeMs,
          endTime: endTimeMs,
        } = data;

        const contractWeb3 = getERC20Contract(
          rewardToken,
          providerWeb3.getSigner(),
        );

        const [rewardTokenDecimals, symbol] = await Promise.all([
          contractWeb3.decimals(),
          contractWeb3.symbol(),
        ]);

        const rps = toDecimals(rpsValue, rewardTokenDecimals);

        const allowance = await contractWeb3.allowance(account, spenderAddress);

        const neededAmountForRps = BigNumber.from(rps).mul(
          endTimeMs.getTime() / MS_IN_SEC - startTimeMs.getTime() / MS_IN_SEC,
        );

        if (neededAmountForRps.gt(allowance)) {
          txModalStages.signApproval(neededAmountForRps, symbol);

          const processApproveTx = async () => {
            if (isMultisig) {
              const tx = await contractWeb3.populateTransaction.approve(
                spenderAddress,
                neededAmountForRps,
              );
              await providerWeb3.getSigner().sendUncheckedTransaction(tx);
              return true;
            } else {
              return await contractWeb3.approve(
                spenderAddress,
                neededAmountForRps,
              );
            }
          };

          const approveTx = await runWithTransactionLogger(
            'Approve signing',
            processApproveTx,
          );

          if (typeof approveTx === 'object') {
            await approveTx.wait();
          }

          if (isMultisig) {
            txModalStages.successMultisig();
            return true;
          }
        }

        const response = await callApi({ ...data, rps }, mainPoolAddress);

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
          'useSaveBonusPoolData callback',
          callback,
        );
        const txHash = getTxHash(tx);

        if (isMultisig) {
          txModalStages.successMultisig();
          return true;
        }

        txModalStages.pending(txHash);

        if (typeof tx === 'object') {
          await runWithTransactionLogger('useSaveBonusPoolData', async () =>
            tx.wait(),
          );
        }

        txModalStages.success();

        onConfirm();

        return true;
      } catch (err: unknown) {
        txModalStages.failed(err);
        return false;
      }
    },
    [
      account,
      isMultisig,
      mainPoolAddress,
      onConfirm,
      providerWeb3,
      spenderAddress,
      txModalStages,
    ],
  );
};

export const useEditBonusPool = ({
  mainPoolAddress,
  selectedPool,
  onConfirm,
}: useSaveBonusPoolDataProps) => {
  return useCallback(
    async (data: BonusPoolFields) => {
      if (!mainPoolAddress) {
        console.error(
          'Not enough necessary main pool address',
          mainPoolAddress,
        );
        return false;
      }

      try {
        await callApi(data, mainPoolAddress, selectedPool?.poolId);

        showToastMessage(
          'success',
          `Successfully ${selectedPool?.poolId ? 'updated' : 'created'}`,
        );

        onConfirm?.(true);
        return true;
      } catch (err: unknown) {
        showToastMessage('error', getErrorMessage(err));

        return false;
      }
    },
    [mainPoolAddress, onConfirm, selectedPool?.poolId],
  );
};
