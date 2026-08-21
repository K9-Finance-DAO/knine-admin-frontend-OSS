import { useCallback, useState } from 'react';
import { useDisconnect } from 'rnb-web3/core-react';
import { useConnect } from 'wagmi';
import { WalletButton } from './wallet-button';
import type { ConnectorProps } from './types';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getRedirectionLoadingHTML,
  getWalletConnectUri,
  setRedirectionWindowLocation,
} from '@rnb-web3/wallets-helpers';

let redirectionWindow: Window | null = null;

export const ConnectWC = (props: ConnectorProps) => {
  const {
    onConnect,
    onBeforeConnect,
    shouldInvertWalletIcon,
    walletId,
    walletName,
    icon: WalletIcon,
    downloadURLs,
    connector,
    walletconnectExtras,
    ...rest
  } = props;
  // TODO: think to get back WC warning badge of unpredictable connection issues
  const [isConnecting, setIsConnecting] = useState(false);

  const { connectAsync } = useConnect({
    onSuccess() {
      onConnect?.();
    },
  });
  const { disconnect } = useDisconnect();

  const handleConnect = useCallback(async () => {
    // WCURI – WalletConnect Pairing URI: https://docs.walletconnect.com/2.0/specs/clients/core/pairing/pairing-uri
    // Used for connection without WalletConnect QR modal via redirect
    const WCURIConnector = walletconnectExtras?.connectionViaURI?.connector;
    const WCURICondition = walletconnectExtras?.connectionViaURI?.condition;
    const WCURIRedirectLink =
      walletconnectExtras?.connectionViaURI?.redirectLink;
    const WCURICloseRedirectionWindow =
      walletconnectExtras?.connectionViaURI?.closeRedirectionWindow ?? true;

    setIsConnecting(true);

    try {
      onBeforeConnect?.();
      disconnect?.();

      if (WCURICondition && WCURIConnector && WCURIRedirectLink) {
        // BEGIN Handle connection via redirect using WC Pairing URI (without WalletConnect QR modal)
        // Because of popup blockers, window.open must be called directly from onclick handler
        redirectionWindow = window.open('', '_blank');
        redirectionWindow?.document.write(getRedirectionLoadingHTML());

        // Initiate a connection, but do not block the further execution
        void connectAsync({ connector: WCURIConnector }).finally(() => {
          // We got a connection result
          if (WCURICloseRedirectionWindow) {
            // Close the previously opened window if necessary
            redirectionWindow?.close();
          }
        });

        // Wait for WalletConnect Pairing URI to arrive
        const wcUri = await getWalletConnectUri(WCURIConnector);
        setRedirectionWindowLocation(
          WCURIRedirectLink,
          wcUri,
          redirectionWindow,
        );
        // END Handle connection via redirect using WC Pairing URI (without WalletConnect QR modal)
      } else {
        await connectAsync({ connector });
      }
    } catch (err) {
      console.debug('WC error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, [
    connectAsync,
    connector,
    disconnect,
    onBeforeConnect,
    walletconnectExtras?.connectionViaURI?.closeRedirectionWindow,
    walletconnectExtras?.connectionViaURI?.condition,
    walletconnectExtras?.connectionViaURI?.connector,
    walletconnectExtras?.connectionViaURI?.redirectLink,
  ]);

  return (
    <WalletButton {...rest} icon={WalletIcon} onClick={handleConnect}>
      {walletName}
    </WalletButton>
  );
};
