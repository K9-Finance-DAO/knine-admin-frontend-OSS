import { ButtonProps, Typography } from '@mui/material';
import { ElementType, Fragment, isValidElement } from 'react';
import type { WalletAdapterData } from '@rnb-web3/types';
import { isWalletAdapterIcons } from 'rnb-web3/core-react';
import { ButtonContainer } from './styles';

type WalletButtonProps = {
  icon?: WalletAdapterData['icon'];
  shouldInvertWalletIcon?: boolean;
} & ButtonProps;

export const WalletButton = ({
  icon,
  children,
  shouldInvertWalletIcon = false,
  ...rest
}: WalletButtonProps) => {
  let ButtonIcon: ElementType = Fragment;

  if (icon) {
    ButtonIcon = isWalletAdapterIcons(icon) ? icon.light : icon;
  }

  return (
    <ButtonContainer {...rest} aria-label={`Connect ${children}`}>
      {isValidElement(<ButtonIcon />) && <ButtonIcon />}
      <Typography>{children}</Typography>
    </ButtonContainer>
  );
};
