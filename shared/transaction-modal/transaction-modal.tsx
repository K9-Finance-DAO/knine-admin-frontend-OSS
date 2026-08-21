import { useConnectorInfo } from 'rnb-web3/web3-react';
import { getUseModal, ModalComponentType } from 'providers/modal-provider';
import { ModalWrapper, ModalWrapperProps } from '../components';
import { ReactNode } from 'react';

type TransactionModalProps = {
  closable?: boolean;
  children?: ReactNode;
  title?: ReactNode | string;
} & Partial<ModalWrapperProps>;

export const TransactionModal: ModalComponentType<TransactionModalProps> = ({
  open,
  closable,
  onClose,
  children,
  title,
  ...props
}) => {
  const { isLedger } = useConnectorInfo();
  const isClosable = !isLedger || closable;

  return (
    <ModalWrapper
      title={title}
      {...props}
      open={Boolean(children)}
      onClose={isClosable ? onClose : undefined}
    >
      {children}
    </ModalWrapper>
  );
};

export const useTransactionModal = getUseModal(TransactionModal);
