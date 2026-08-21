import { Component } from 'types';
import { AddressBadge } from '../components/address-badge/address-badge';
import {
  WalletCardRowStyle,
  WalletCardAccountStyle,
  CardContentStyle,
  CardBalanceStyle,
  CardValue,
  CardStyle,
} from './styles';
import { CardBalanceProps, WalletCardRowComponent } from './types';
import { Stack, StackProps } from '@mui/material';
import { FC } from 'react';
import { InlineLoader } from '@lidofinance/lido-ui';
import { useAccountModal } from 'shared/wallet/account-modal';

export const Card = (props: StackProps) => {
  return <CardStyle color="accent" {...props} />;
};

export const CardRow = (props: WalletCardRowComponent) => {
  return <WalletCardRowStyle {...props} />;
};

export const CardBalance: FC<CardBalanceProps> = (props) => {
  const {
    title,
    small = false,
    extra,
    loading = false,
    children,
    value,
    ...rest
  } = props;

  const hasChildren = !!children;
  return (
    <CardBalanceStyle {...rest}>
      <Stack direction="row" alignItems="center" lineHeight="24px">
        {title}
      </Stack>
      <CardValue $small={small}>{loading ? <InlineLoader /> : value}</CardValue>
      {hasChildren && (
        <CardContentStyle $hidden={loading}>{children}</CardContentStyle>
      )}
    </CardBalanceStyle>
  );
};

export const CardAccount: Component<'div', { account?: string | null }> = (
  props,
) => {
  const { account, ...rest } = props;
  const { openModal } = useAccountModal();

  return (
    <WalletCardAccountStyle {...rest}>
      <AddressBadge
        data-testid="accountSectionCard"
        address={account}
        onClick={() => openModal({})}
        color="accent"
      />
    </WalletCardAccountStyle>
  );
};
