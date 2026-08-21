import { useSwitchNetworkModal } from './switch-network-modal';
import { Button, type ButtonProps } from '@mui/material';
import type { SwitchNetworkButtonProps } from './switch-network';

type SwitchNetworkWithModalProps = SwitchNetworkButtonProps & ButtonProps;

export const SwitchNetworkButtonWithModal = (
  props: SwitchNetworkWithModalProps,
) => {
  const { chainId, onSuccess, onError, ...rest } = props;
  const { openModal } = useSwitchNetworkModal();

  return (
    <Button
      color="secondary"
      fullWidth
      onClick={() => openModal({ chainId, onSuccess, onError })}
      {...rest}
    >
      Switch network
    </Button>
  );
};
