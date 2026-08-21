import { useCallback } from 'react';
import { useConnect } from 'wagmi';
import { suggestApp } from 'utils';
import {
  isMobileOrTablet,
  openWindow,
  useDisconnect,
} from 'rnb-web3/core-react';
import { WalletButton } from './wallet-button';
import type { ConnectorProps } from './types';

export const ConnectInjected = (props: ConnectorProps) => {
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
    deeplink,
    ...rest
  } = props;

  const { connectAsync } = useConnect({
    onSuccess() {
      onConnect?.();
    },
  });
  const { disconnect } = useDisconnect();

  const handleConnect = useCallback(async () => {
    try {
      onBeforeConnect?.();

      if (await detector?.()) {
        disconnect?.();
        await connectAsync({ connector });
      } else if (isMobileOrTablet && deeplink) {
        openWindow(deeplink);
      } else if (downloadURLs) {
        suggestApp(downloadURLs);
      }
    } catch (err: unknown) {
      console.debug('ConnectInjected error:', err);
    }
  }, [
    onBeforeConnect,
    detector,
    deeplink,
    downloadURLs,
    disconnect,
    connectAsync,
    connector,
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
