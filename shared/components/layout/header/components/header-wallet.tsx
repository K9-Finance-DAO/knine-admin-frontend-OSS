import { FC } from 'react';
import { useWeb3 } from 'rnb-web3/web3-react';
import { useSDK } from '@knine-sdk/react';
import { CHAINS } from '@knine-sdk/constants';
import NoSSRWrapper from '../../../no-ssr-wrapper';

import {
  AccountButton,
  chainsInfo,
  chainToChainInfoHashMap,
  Connect,
} from 'shared/wallet';

import { WalletChainStyle } from '../styles';
import Image from 'next/image';
import { Stack, Typography, useTheme } from '@mui/material';
import { useClientConfig } from 'providers/client-config';

const HeaderWallet: FC = () => {
  const { active } = useWeb3();
  const { defaultChain } = useClientConfig();
  const { chainId } = useSDK();
  const theme = useTheme();

  const chainName = CHAINS?.[chainId] ?? CHAINS[defaultChain];

  return (
    <NoSSRWrapper>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        {active && (
          <WalletChainStyle>
            <Image
              src={
                chainToChainInfoHashMap?.[chainId]?.logo ||
                chainsInfo.ethereum.logo
              }
              alt={chainName}
              width={24}
              height={24}
            />
            <Typography
              className="medium"
              color={theme.palette.colorScheme.light}
              display={{ xs: 'none', md: 'block' }}
            >
              {chainName}
            </Typography>
          </WalletChainStyle>
        )}
        {active ? <AccountButton /> : <Connect />}
      </Stack>
    </NoSSRWrapper>
  );
};

export default HeaderWallet;
