import { TxLinkEtherscan } from 'shared/components/tx-link-etherscan';

type ViewTxProps = {
  txHash: string;
  withText?: boolean;
};

export const ViewTx = ({ txHash, withText = true }: ViewTxProps) => {
  if (!txHash) return null;

  return (
    <>
      {withText && <>View your transaction on </>}
      <TxLinkEtherscan txHash={txHash} />
    </>
  );
};
