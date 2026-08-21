import { TxLinkEtherscan } from 'shared/components/tx-link-etherscan';

type SuccessTextProps = {
  operationText?: string;
  txHash?: string;
};

export const SuccessText = ({ operationText, txHash }: SuccessTextProps) => {
  return (
    <>
      {operationText && (
        <>
          {operationText} operation was successful. <br />
        </>
      )}
      {txHash && (
        <>
          View your transaction on <TxLinkEtherscan txHash={txHash} />.
        </>
      )}
    </>
  );
};
