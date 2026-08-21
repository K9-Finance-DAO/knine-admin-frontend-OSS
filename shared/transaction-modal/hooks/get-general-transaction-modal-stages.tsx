import {
  TxStageFail,
  TxStagePending,
  TxStageSign,
  TxStageSuccess,
  TxStageSuccessMultisig,
} from '../tx-stages-basic';
import { getErrorMessage } from 'utils';
import type { TransactionModalTransitStage } from './use-transaction-modal-stage';
import { OptionsProps } from './types';
import { TxStageSignOperationAmount } from 'shared/transaction-modal/tx-stages-composed';
import { BigNumber } from 'ethers';

export const baseOptions = {
  titleClassname: 'medium',
};

export const getGeneralTransactionModalStages = (
  transitStage: TransactionModalTransitStage,
  opts?: OptionsProps,
) => ({
  successMultisig: () =>
    transitStage(<TxStageSuccessMultisig />, {
      closable: true,
    }),
  failed: (error: unknown, onRetry?: () => void, customText?: string) =>
    transitStage(
      <TxStageFail
        failedText={customText ?? getErrorMessage(error)}
        onRetry={onRetry}
        {...opts}
      />,
      {
        closable: true,
        title: 'Not Successful',
        ...baseOptions,
      },
    ),
  sign: () =>
    transitStage(
      <TxStageSign title='Please press "Send" button in your wallet' />,
      {
        title: 'Sign transaction',
      },
    ),

  signApproval: (amount: BigNumber, token = '', decimals?: number) =>
    transitStage(
      <TxStageSignOperationAmount
        token={token}
        operationText={'Approving'}
        amount={amount}
        decimals={decimals}
      />,
      { title: 'Approve', ...baseOptions },
    ),

  pending: (txHash?: string) =>
    transitStage(
      <TxStagePending title="Pending transaction" txHash={txHash} />,
      {
        title: 'Confirmation',
      },
    ),

  success: (txHash?: string) =>
    transitStage(
      <TxStageSuccess title="Successfully send transaction" txHash={txHash} />,
      {
        title: 'Sent',
      },
    ),
});
