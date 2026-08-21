import { useCallback } from 'react';
import { useConnect } from 'wagmi';
import { useDisconnect } from 'rnb-web3/core-react';
import { WalletButton } from './wallet-button';
import type { ConnectorProps } from './types';

export const ConnectCoinbase = (props: ConnectorProps) => {
  const {
    onConnect,
    onBeforeConnect,
    shouldInvertWalletIcon,
    walletId,
    walletName,
    icon: WalletIcon,
    downloadURLs,
    detector,
    connector,
    ...rest
  } = props;

  const { connect } = useConnect({
    onSuccess() {
      onConnect?.();
    },
  });
  const { disconnect } = useDisconnect();

  const handleConnect = useCallback(() => {
    onBeforeConnect?.();
    disconnect?.();
    connect({ connector });
  }, [connect, connector, disconnect, onBeforeConnect]);

  return (
    <WalletButton
      {...rest}
      icon={WalletIcon}
      shouldInvertWalletIcon={shouldInvertWalletIcon}
      onClick={handleConnect}
    >
      {walletName}
    </WalletButton>
  );
};
