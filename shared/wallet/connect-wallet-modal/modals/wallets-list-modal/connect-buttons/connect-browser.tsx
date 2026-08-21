import { useCallback } from 'react';
import { useConnect } from 'wagmi';
import { useDisconnect, useRnbWeb3Modal } from 'rnb-web3/core-react';
import { WalletButton } from './wallet-button';
import type { ConnectorProps } from './types';

const CONNECT_BROWSER_NO_DETECTED =
  'This button is designed for a generic connection to browser extension wallets. However, if no default injected web3 provider is detected, please install a compatible browser extension wallet or ensure that it is enabled, then reload the page.';

export const ConnectBrowser = (props: ConnectorProps) => {
  const {
    onConnect,
    onBeforeConnect,
    shouldInvertWalletIcon,
    walletId,
    walletName,
    icon: WalletIcon,
    connector,
    ...rest
  } = props;
  const { openModalAsync } = useRnbWeb3Modal();
  const web3ProviderIsDetected = !!globalThis.window?.ethereum;

  const { connectAsync } = useConnect({
    onSuccess() {
      onConnect?.();
    },
  });
  const { disconnect } = useDisconnect();

  const handleConnect = useCallback(async () => {
    onBeforeConnect?.();

    if (web3ProviderIsDetected) {
      disconnect?.();
      await connectAsync({ connector });
    } else {
      await openModalAsync({
        type: 'requirements',
        props: {
          title: 'No wallets have been detected',
          text: CONNECT_BROWSER_NO_DETECTED,
        },
      });
    }
  }, [
    connectAsync,
    connector,
    disconnect,
    onBeforeConnect,
    openModalAsync,
    web3ProviderIsDetected,
  ]);

  return (
    <WalletButton
      {...rest}
      onClick={() => void handleConnect()}
      icon={WalletIcon}
    >
      {walletName}
    </WalletButton>
  );
};
