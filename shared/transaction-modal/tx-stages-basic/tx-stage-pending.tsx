import { TransactionModalContent } from 'shared/transaction-modal/transaction-modal-content';
import { Spinner } from 'shared/components';
import { ViewTx } from 'shared/transaction-modal/tx-stages-parts';
import { ReactNode } from 'react';

type TxStagePendingProps = {
  description?: ReactNode;
  title: ReactNode;
  txHash?: string | null;
};

export const TxStagePending = ({
  title,
  description,
  txHash,
}: TxStagePendingProps) => {
  return (
    <TransactionModalContent
      icon={<Spinner size="large" />}
      title={title}
      description={description || 'Awaiting block confirmation'}
      footerHint={txHash && <ViewTx txHash={txHash} />}
    />
  );
};
