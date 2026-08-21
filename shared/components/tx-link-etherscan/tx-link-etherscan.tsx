import { useSDK } from '@knine-sdk/react';
import { getEtherscanTxLink } from '@knine-sdk/helpers';
import { Link } from '@mui/material';
import { CHAINS } from '@knine-sdk/constants';

type TxLinkEtherscanProps = {
  text?: string;
  txHash?: string | null;
  chainId?: CHAINS;
};

const SCANNER_NAMES = {
  [CHAINS.Shibarium]: 'Shibariumscan',
  [CHAINS.Puppynet]: 'Puppyscan',
  [CHAINS.Mainnet]: 'Etherscan',
  [CHAINS.Sepolia]: 'Etherscan',
};

export const getScannerNameByChainId = (chain: CHAINS) => SCANNER_NAMES[chain];

export const TxLinkEtherscan = (props: TxLinkEtherscanProps) => {
  const { txHash, text } = props;
  const { chainId: currentChainId } = useSDK();

  if (!txHash) return null;

  const targetChainId = props?.chainId ?? currentChainId;

  return (
    <Link
      className="accent"
      href={getEtherscanTxLink(targetChainId, txHash)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text ?? getScannerNameByChainId(targetChainId)}
    </Link>
  );
};
