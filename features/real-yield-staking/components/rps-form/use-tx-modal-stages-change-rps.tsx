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
import { TOKENS } from '@knine-sdk/constants';

const STAGE_OPERATION_ARGS = {
  operationText: 'Change reward per second',
};

const getTxModalStagesChangeRewardPerSecond = (
  transitStage: TransactionModalTransitStage,
) => ({
  ...getGeneralTransactionModalStages(transitStage, {
    operationText: STAGE_OPERATION_ARGS.operationText,
  }),

  sign: (amount: BigNumber) =>
    transitStage(
      <TxStageSignOperationAmount
        {...STAGE_OPERATION_ARGS}
        token={TOKENS.BONE}
        amount={amount}
      />,
      { title: 'You are now changing reward per second' },
    ),

  pending: (amount: BigNumber, txHash?: string) =>
    transitStage(
      <TxStageSignOperationAmount
        {...STAGE_OPERATION_ARGS}
        token={TOKENS.BONE}
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
            Change reward per second to{' '}
            <TxAmount amount={amount} symbol={TOKENS.BONE} />
          </>
        }
        description="Changing reward per second operation was successful"
      />,
      {
        title: 'Changing reward per second successfully',
        closable: true,
      },
    ),
});

export const useTxModalStagesChangeRewardPerSecond = () => {
  return useTransactionModalStage(getTxModalStagesChangeRewardPerSecond);
};
