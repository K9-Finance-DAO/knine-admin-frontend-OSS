import { FC } from 'react';
import { useSDK } from '@knine-sdk/react';
import { Button, ButtonProps, styled, useTheme } from '@mui/material';
import { BORDER_RADIUS_M } from 'styles';
import Image from 'next/image';
import { useAccountModal } from 'shared/wallet/account-modal';
import { Icons } from '../../components';

const AccountButtonStyled = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2, 1, 1),
  height: 40,
  background: theme.palette.colorScheme.darkTertiary,
  border: `1.5px solid ${theme.palette.colorScheme.stroke}`,
  borderRadius: BORDER_RADIUS_M,
  color: theme.palette.colorScheme.white,
  svg: {
    marginRight: 6,
  },
}));

export const AccountButton: FC<ButtonProps & { addressSymbols?: number[] }> = (
  props,
) => {
  const { onClick, addressSymbols = [6, 4], ...rest } = props;
  const { openModal } = useAccountModal();
  const { account } = useSDK();
  const theme = useTheme();

  return (
    <AccountButtonStyled
      variant="outlined"
      color="secondary"
      onClick={onClick ?? (() => openModal({}))}
      {...rest}
    >
      <Icons.Wallet fill={theme.palette.colorScheme.orangeMid} />
      {account
        ? `${account?.slice(0, addressSymbols[0])}...${account?.slice(-addressSymbols[1])}`
        : ''}
    </AccountButtonStyled>
  );
};
