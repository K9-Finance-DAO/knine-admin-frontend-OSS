import { TransactionModalContent } from '../transaction-modal-content';
import { Icons } from 'shared/components';
import { ViewTx } from 'shared/transaction-modal/tx-stages-parts';

type TxStageSuccessProps = {
  txHash?: string | null;
  description?: React.ReactNode;
  title: React.ReactNode;
  footer?: React.ReactNode;
  showEtherscan?: boolean;
};

export const TxStageSuccess = ({
  txHash,
  description,
  title,
  footer,
  showEtherscan = true,
}: TxStageSuccessProps) => {
  return (
    <TransactionModalContent
      icon={<Icons.Success />}
      title={title}
      description={description}
      footerHint={showEtherscan && txHash && <ViewTx txHash={txHash} />}
      footer={footer}
    />
  );
};
