import { TransactionModalContent } from 'shared/transaction-modal/transaction-modal-content';
import { Spinner } from 'shared/components';
import { ReactNode } from 'react';

type TxStageSignProps = {
  description?: ReactNode;
  title: ReactNode;
};

export const TxStageSign = ({ title, description }: TxStageSignProps) => {
  return (
    <TransactionModalContent
      icon={<Spinner size="large" />}
      title={title}
      description={description}
      footerHint="Confirm this transaction in your wallet"
    />
  );
};
