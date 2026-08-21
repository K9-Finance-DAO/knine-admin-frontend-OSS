import {
  baseOptions,
  getGeneralTransactionModalStages,
  TransactionModalTransitStage,
  useTransactionModalStage,
} from 'shared/transaction-modal/hooks';
import {
  TxAmount,
  TxStageSignOperationAmount,
  TxStageSuccess,
} from 'shared/transaction-modal';
import { BigNumber } from 'ethers';

const STAGE_OPERATION_ARGS = {
  operationText: 'Change max lockup multiplier',
};

const getTxModalStagesChangeMultiplier = (
  transitStage: TransactionModalTransitStage,
) => ({
  ...getGeneralTransactionModalStages(transitStage, {
    operationText: STAGE_OPERATION_ARGS.operationText,
  }),

  sign: (amount: BigNumber) =>
    transitStage(
      <TxStageSignOperationAmount
        {...STAGE_OPERATION_ARGS}
        token=""
        amount={amount}
      />,
      { title: 'You are now changing max lockup multiplier' },
    ),

  pending: (amount: BigNumber, txHash?: string) =>
    transitStage(
      <TxStageSignOperationAmount
        {...STAGE_OPERATION_ARGS}
        token=""
        amount={amount}
        isPending
        txHash={txHash}
      />,
      { title: 'Confirmation', ...baseOptions },
    ),

  success: (amount: BigNumber, txHash?: string) =>
    transitStage(
      <TxStageSuccess
        txHash={txHash}
        title={
          <>
            Change max lockup multiplier to{' '}
            <TxAmount amount={amount} symbol="" />
          </>
        }
        description="Changing max lockup multiplier operation was successful"
      />,
      {
        title: 'Changing max lockup multiplier successfully',
        closable: true,
      },
    ),
});

export const useTxModalStagesChangeMultiplier = () => {
  return useTransactionModalStage(getTxModalStagesChangeMultiplier);
};
