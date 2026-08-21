import { useCallback } from 'react';
import { useEtherscanOpen } from '@knine-sdk/react';
import { useConnectorInfo, useDisconnect } from 'rnb-web3/core-react';
import { useWeb3 } from 'rnb-web3/web3-react';

import type { ModalComponentType } from 'providers/modal-provider';
import { useAuthToken, useCopyToClipboard } from 'shared/hooks';
import { AccountModalContentStyle, AccountModalActionButton } from './styles';
import { Icons, ModalWrapper } from 'shared/components';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { AccountButton } from 'shared/wallet';

export const AccountModal: ModalComponentType = ({
  onClose,
  open,
  ...props
}) => {
  const { account } = useWeb3();
  const { removeAuthToken } = useAuthToken();
  const { connectorName } = useConnectorInfo();
  const { disconnect } = useDisconnect();
  const theme = useTheme();

  const handleDisconnect = useCallback(async () => {
    disconnect?.();
    removeAuthToken();
    onClose?.();
  }, [disconnect, onClose, removeAuthToken]);

  const handleCopy = useCopyToClipboard(account ?? '');
  const handleEtherscan = useEtherscanOpen(account ?? '', 'address');

  return (
    <ModalWrapper
      open={Boolean(open)}
      title="Account"
      centeredTitle={false}
      titleSize="sm"
      titleClassname="lg"
      borderedHeader={false}
      onClose={onClose}
      contentSpacing={2}
      {...props}
    >
      <AccountModalContentStyle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {connectorName && (
            <Typography color={theme.palette.colorScheme.white}>
              Connected with {connectorName}
            </Typography>
          )}

          {disconnect && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          )}
        </Stack>

        <AccountButton addressSymbols={[8, 10]} onClick={handleCopy} />

        <Stack direction="row" gap={{ xs: 1, sm: 2 }} flexWrap="wrap">
          <AccountModalActionButton variant="text" onClick={handleCopy}>
            <Icons.Copy />
            &nbsp; Copy address
          </AccountModalActionButton>
          <AccountModalActionButton variant="text" onClick={handleEtherscan}>
            <Icons.Share />
            &nbsp; View on Etherscan
          </AccountModalActionButton>
        </Stack>
      </AccountModalContentStyle>
    </ModalWrapper>
  );
};
