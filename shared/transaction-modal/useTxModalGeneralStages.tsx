import {
  getGeneralTransactionModalStages,
  TransactionModalTransitStage,
  useTransactionModalStage,
} from './hooks';

const getTxModalStagesStake = (transitStage: TransactionModalTransitStage) => ({
  ...getGeneralTransactionModalStages(transitStage),
});

export const useTxModalGeneralStages = () => {
  return useTransactionModalStage(getTxModalStagesStake);
};
