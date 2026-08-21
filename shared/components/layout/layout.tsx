import {
  ReactNode,
  FC,
  PropsWithChildren,
  useEffect,
  useCallback,
  useState,
} from 'react';

import { Header } from './header/header';
import { Main } from './main/main';
import { Box, Stack } from '@mui/material';
import { Sidebar } from './sidebar';
import { useRouter } from 'next/router';
import { HOME_PATH } from 'config/urls';
import { ConnectorEvents, useAccount } from 'wagmi';
import { useAuthToken } from 'shared/hooks';
import { useSDK } from '@knine-sdk/react';
import { useWeb3 } from 'rnb-web3/web3-react';

type Props = {
  title?: ReactNode;
  subtitle?: ReactNode;
};

export const Layout: FC<PropsWithChildren<Props>> = (props) => {
  const [wasConnecting, setWasConnecting] = useState(false);
  const { children } = props;
  const { authToken, removeAuthToken, getAuthToken } = useAuthToken();
  const { push } = useRouter();
  const { active } = useWeb3();
  const { providerWeb3 } = useSDK();
  const { address, connector, isConnecting } = useAccount();

  const handleRemoveAuthToken = useCallback(() => {
    removeAuthToken();
    void push(HOME_PATH);
  }, [push, removeAuthToken]);

  const handleConnectorChanged: ConnectorEvents['change'] = useCallback(
    (data) => {
      if (data.account && providerWeb3) {
        void getAuthToken(data.account, providerWeb3);
      }
    },
    [getAuthToken, providerWeb3],
  );

  // check connection after "connecting" status
  useEffect(() => {
    if (isConnecting && !wasConnecting) {
      setWasConnecting(true);
    } else if (
      wasConnecting &&
      !isConnecting &&
      (!address || !authToken || !active)
    ) {
      void push(HOME_PATH);
    }
  }, [active, address, authToken, isConnecting, push, wasConnecting]);

  // listen events for changing auth token
  useEffect(() => {
    if (connector) {
      connector.on('disconnect', handleRemoveAuthToken);
      connector.on('change', handleConnectorChanged);
    }

    return () => {
      connector?.off('disconnect', handleRemoveAuthToken);
      connector?.off('change', handleConnectorChanged);
    };
  }, [connector, handleConnectorChanged, handleRemoveAuthToken]);

  return (
    <Stack direction="row" width="100vw" pr="-calc(100vw - 100%)">
      <Sidebar subtitle="Launch App" />
      <Box width="100%" px={{ xs: 0, md: 4 }}>
        <Header />
        <Main sx={{ padding: 0, maxWidth: '100%', margin: 0 }}>{children}</Main>
      </Box>
    </Stack>
  );
};
