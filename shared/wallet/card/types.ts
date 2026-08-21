import { ReactNode } from 'react';
import { BoxProps, StackProps } from '@mui/material';

export type WalletCardRowComponent = BoxProps;

export type CardBalanceProps = {
  title: ReactNode;
  value: ReactNode;
  small?: boolean;
  loading?: boolean;
  extra?: ReactNode;
} & Omit<StackProps, 'title'>;
