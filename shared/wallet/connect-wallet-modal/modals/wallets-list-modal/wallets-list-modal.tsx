import { Box, styled } from '@mui/material';
import { useRnbWeb3Modal } from 'rnb-web3/core-react';
import { Terms } from '../terms';
import { IModal } from '../types';
import { ModalWrapper } from 'shared/components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createWalletButtons } from '@rnb-web3/wallets-helpers';
import {
  ConnectBrowser,
  ConnectCoinbase,
  ConnectInjected,
  ConnectWC,
} from './connect-buttons';
import type { WalletAdapterData } from '@rnb-web3/types';

interface ConnectWalletProps extends IModal {
  walletDataList: WalletAdapterData[];
}

const ButtonsContainer = styled(Box)(({ theme }) => ({
  maxHeight: 350,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  overflow: 'hidden scroll',
  paddingRight: '6px',
  marginRight: '-12px',

  '&::-webkit-scrollbar-track': {
    scrollbarWidth: 'thin',
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
    backgroundClip: 'content-box',
  },
}));

const connectorById = {
  default: ConnectInjected,
  browserExtension: ConnectBrowser,
  walletConnect: ConnectWC,
  coinbaseWallet: ConnectCoinbase,
};

export const WalletsListModal = (props: ConnectWalletProps) => {
  const { open, onSuccess, onReject, walletDataList } = props;
  const { termsChecked } = useRnbWeb3Modal();

  return (
    <ModalWrapper
      open={open}
      onClose={onReject}
      titleSize="sm"
      titleClassname="lg"
      centeredTitle={false}
      title="Connect wallet"
      PaperProps={{ sx: { overflow: 'hidden', pb: 0 } }}
    >
      <Box>
        <Terms />
        <ButtonsContainer>
          {createWalletButtons({
            commonProps: {
              disabled: !termsChecked,
              onConnect: onSuccess,
            },
            buttonComponentsByConnectorId: connectorById,
            hiddenConnectorsByWalletId: {
              ledgerHID: true,
            },
            walletDataList,
          })}
        </ButtonsContainer>
      </Box>
    </ModalWrapper>
  );
};
