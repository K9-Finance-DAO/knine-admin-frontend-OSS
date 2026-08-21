import { Stack, styled, Typography } from '@mui/material';
import Ellipse from './assets/ellipse.svg';
import Image from 'next/image';
import { BorderedBox, LogoWithTitle } from 'shared/components';
import { useEffect, useMemo } from 'react';
import { useWeb3 } from 'rnb-web3/web3-react';
import {
  ConnectInjected,
  ConnectWC,
} from 'shared/wallet/connect-wallet-modal/modals/wallets-list-modal/connect-buttons';
import { useRnbWeb3Context } from 'rnb-web3/core-react';
import Head from 'next/head';
import { Fallback } from 'shared/wallet';
import { WalletAdapterData } from '@rnb-web3/types';
import { useSDK } from '@knine-sdk/react';
import { useAuthToken } from 'shared/hooks';

const MetamaskButton = styled(ConnectInjected)({});
const WCButton = styled(ConnectWC)({});

export const LoginPage = () => {
  const { getAuthToken } = useAuthToken();
  const { account, active } = useWeb3();
  const { providerWeb3 } = useSDK();
  const { walletDataList } = useRnbWeb3Context();

  const walletsData = useMemo(() => {
    const wallets: Record<string, WalletAdapterData | undefined> = {
      metamask: undefined,
      walletConnect: undefined,
    };
    walletDataList.forEach((wallet) => {
      if (wallet.walletName === 'MetaMask') wallets.metamask = wallet;
      if (wallet.walletName === 'WalletConnect') wallets.walletConnect = wallet;
    });
    return wallets;
  }, [walletDataList]);

  useEffect(() => {
    if (account && active && providerWeb3) {
      void getAuthToken(account, providerWeb3);
    }
  }, [account, active, providerWeb3, getAuthToken]);

  return (
    <Stack
      position="relative"
      width="100vw"
      height="100vh"
      alignItems="center"
      bgcolor={(theme) => theme.palette.colorScheme.darkSecondary}
    >
      <Head>
        <title>Login</title>
      </Head>
      <Image src={Ellipse} alt="ellipse" width={732} height={205} />
      <LogoWithTitle size="lg" subtitle="Administrator" />
      <BorderedBox
        mt={6}
        p={(theme) => theme.spacing(2, 1, 1.5)}
        maxWidth={432}
        bgcolor={(theme) =>
          `${theme.palette.colorScheme.backgroundBase} !important`
        }
      >
        <Stack alignItems="center" spacing={2}>
          <Stack spacing={1}>
            <Typography variant="h4" className="medium" textAlign="center">
              Log in
            </Typography>
            <Typography
              maxWidth={242}
              textAlign="center"
              color={(theme) => theme.palette.colorScheme.base}
            >
              Please select a wallet to connect to this dapp:
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} width="100%">
            <MetamaskButton {...walletsData.metamask} />
            <WCButton {...walletsData.walletConnect} />
          </Stack>
        </Stack>
      </BorderedBox>
      <Fallback mt={2} />
    </Stack>
  );
};
