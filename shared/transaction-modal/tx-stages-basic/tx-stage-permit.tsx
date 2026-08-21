import { TransactionModalContent } from 'shared/transaction-modal/transaction-modal-content';
import { Spinner } from 'shared/components';

export const TxStagePermit = () => {
  return (
    <TransactionModalContent
      icon={<Spinner size="large" />}
      title="Please sign the message"
      description="Processing your request"
      footerHint="Confirm request in your wallet"
    />
  );
};
