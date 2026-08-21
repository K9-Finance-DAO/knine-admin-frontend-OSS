import type { ModalComponentType } from 'providers/modal-provider';
import { ModalWrapper } from '../../components';
import { Stack } from '@mui/material';
import { SwitchNetworkArgs, SwitchNetworkButton } from 'shared/wallet';
import { NetworkAlert } from 'shared/transaction-modal';
import { getUseModal } from 'providers/modal-provider';
import { BodyText } from './styles';
import { ReactNode } from 'react';
import { getChainDisplayName } from 'utils';

type SwitchNetworkModalProps = {
  body?: ReactNode | string;
} & SwitchNetworkArgs;

export const SwitchNetworkModal: ModalComponentType<
  SwitchNetworkModalProps
> = ({ onClose, open, body, ...props }) => {
  const { chainId, onSuccess, onError } = props;

  const bodyContent = body ?? (
    <>
      Switch network to <span>{getChainDisplayName(chainId)}</span> to proceed.
    </>
  );

  const handleSuccessSwitch = () => {
    onSuccess?.();
    onClose?.();
  };

  return (
    <ModalWrapper
      open={Boolean(open)}
      title="Switch network"
      titleSize="sm"
      titleClassname="lg"
      borderedHeader={false}
      onClose={onClose}
      contentSpacing={2}
      {...props}
    >
      <Stack alignItems="center" textAlign="center" spacing={4}>
        <NetworkAlert network={chainId} />
        <BodyText>{bodyContent}</BodyText>

        <SwitchNetworkButton
          fullWidth
          onSuccess={handleSuccessSwitch}
          onError={onError}
          chainId={chainId}
        />
      </Stack>
    </ModalWrapper>
  );
};

export const useSwitchNetworkModal = getUseModal(SwitchNetworkModal);
