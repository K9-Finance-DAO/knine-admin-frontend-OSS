import { ComponentProps, PropsWithChildren } from 'react';
import { SwitchNetworkButton } from 'shared/wallet';
import { useSDK } from '@knine-sdk/react';
import { useWeb3 } from 'rnb-web3/web3-react';

export type SwitchNetworkButtonGuardProps = PropsWithChildren &
  ComponentProps<typeof SwitchNetworkButton>;

export const SwitchNetworkButtonGuard = ({
  children,
  ...props
}: SwitchNetworkButtonGuardProps) => {
  const { active } = useWeb3();

  const { chainId: currentChainId } = useSDK();

  if (active && props.chainId !== currentChainId) {
    return <SwitchNetworkButton {...props} />;
  }

  return <>{children}</>;
};
