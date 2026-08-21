import { TransactionModalContent } from '../transaction-modal-content';
import { Icons } from 'shared/components';

export const TxStageSuccessMultisig = () => {
  return (
    <TransactionModalContent
      icon={<Icons.Success />}
      title="Success"
      description="Your transaction has been successfully created in the multisig wallet and awaits approval from other participants"
    />
  );
};
