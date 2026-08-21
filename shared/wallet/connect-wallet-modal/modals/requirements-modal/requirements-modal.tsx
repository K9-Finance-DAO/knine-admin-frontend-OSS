import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import { ModalWrapper } from 'shared/components';
import { IModal } from '../types';

interface RequirementsModalPayloadProps {
  payload: {
    icon?: ReactNode;
    title?: string;
    text?: ReactNode;
    payload?: any;
  };
}

export const RequirementsModal = (
  props: RequirementsModalPayloadProps & IModal,
) => {
  const { open, onReject, payload } = props;

  return (
    <ModalWrapper
      open={open}
      onClose={onReject}
      title={payload?.title}
      PaperProps={{ sx: { overflow: 'hidden' } }}
    >
      <Typography textAlign="center">{payload?.text}</Typography>
    </ModalWrapper>
  );
};
