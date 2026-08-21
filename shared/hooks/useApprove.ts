import invariant from 'tiny-invariant';
import { useCallback } from 'react';

import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { getERC20Contract } from '@knine-sdk/contracts';
import { useAllowance, useSDK } from '@knine-sdk/react';

import { isContract } from 'utils/isContract';
import { getFeeData } from 'utils/getFeeData';
import { runWithTransactionLogger } from 'utils';

import { useCurrentStaticRpcProvider } from './use-current-static-rpc-provider';
import { STRATEGY_LAZY } from 'utils/swrStrategies';
import { CHAINS } from '@knine-sdk/constants';

type ApproveOptions =
  | {
      onTxStart?: () => void | Promise<void>;
      onTxSent?: (tx: string | ContractTransaction) => void | Promise<void>;
      onTxAwaited?: (tx: ContractReceipt) => void | Promise<void>;
    }
  | undefined;

export type UseApproveResponse = {
  approve: (options?: ApproveOptions) => Promise<void>;
  needsApprove: boolean;
  initialLoading: boolean;
  allowance: BigNumber | undefined;
  loading: boolean;
  error: unknown;
};

export const useApprove = (
  amount: BigNumber,
  token: string,
  spender: string,
  owner?: string,
  chainId?: CHAINS,
  shouldEstimateFee = true,
): UseApproveResponse => {
  const { providerWeb3, account, chainId: currentChainId } = useSDK();
  const chosenChainId = chainId ?? currentChainId;
  const { staticRpcProvider } = useCurrentStaticRpcProvider({
    chainId: chosenChainId,
  });

  const mergedOwner = owner ?? account;
  invariant(token != null, 'Token is required');
  invariant(spender != null, 'Spender is required');
  const result = useAllowance(
    token,
    spender,
    mergedOwner,
    STRATEGY_LAZY,
    staticRpcProvider,
  );
  const { data: allowance, initialLoading, update: updateAllowance } = result;

  const needsApprove = Boolean(
    !initialLoading && allowance && !amount.isZero() && amount.gt(allowance),
  );

  const approve = useCallback<UseApproveResponse['approve']>(
    async ({ onTxStart, onTxSent, onTxAwaited } = {}) => {
      invariant(providerWeb3 != null, 'Web3 provider is required');
      invariant(chainId, 'chain id is required');
      invariant(account, 'account is required');
      await onTxStart?.();
      const contractWeb3 = getERC20Contract(token, providerWeb3.getSigner());
      const isMultisig = await isContract(account, providerWeb3);

      const processApproveTx = async () => {
        if (isMultisig) {
          const tx = await contractWeb3.populateTransaction.approve(
            spender,
            amount,
          );
          const hash = await providerWeb3
            .getSigner()
            .sendUncheckedTransaction(tx);
          return hash;
        } else {
          const { maxFeePerGas, maxPriorityFeePerGas } =
            await getFeeData(staticRpcProvider);

          const overrides = shouldEstimateFee
            ? {
                maxPriorityFeePerGas,
                maxFeePerGas,
                from: account,
              }
            : {};

          return await contractWeb3.approve(spender, amount, overrides);
        }
      };

      const approveTx = await runWithTransactionLogger(
        'Approve signing',
        processApproveTx,
      );
      await onTxSent?.(approveTx);

      if (typeof approveTx === 'object') {
        const receipt = await runWithTransactionLogger(
          'Approve block confirmation',
          () => approveTx.wait(),
        );
        await onTxAwaited?.(receipt);
      }

      await updateAllowance();
    },
    [
      chainId,
      account,
      token,
      updateAllowance,
      spender,
      amount,
      staticRpcProvider,
      providerWeb3,
    ],
  );

  return {
    approve,
    needsApprove,

    allowance,
    initialLoading,

    /*
     * support dependency collection
     * https://swr.vercel.app/advanced/performance#dependency-collection
     */

    get loading() {
      return result.loading;
    },
    get error() {
      return result.error;
    },
  };
};
