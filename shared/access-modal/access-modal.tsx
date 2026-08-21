import { getUseModal, ModalComponentType } from 'providers/modal-provider';
import { Icons, ModalWrapper, ModalWrapperProps } from '../components';
import { ReactNode } from 'react';
import { Button, Stack, styled, Typography } from '@mui/material';
import { useSidebarActions } from 'providers/sidebar-provider';
import { useRouter } from 'next/router';
import { STATISTICS_PATH } from 'config/urls';

export const WithStyledSpan = styled(Typography)(({ theme }) => ({
  span: {
    color: theme.palette.colorScheme.orangeMid,
  },
}));

export const Title = styled(WithStyledSpan)<{ component?: string }>(
  ({ theme }) => ({
    fontSize: '16px',
    fontWeight: 500,
    color: theme.palette.colorScheme.graySecondary,
    marginTop: theme.spacing(4),
    textAlign: 'center',
  }),
);

type AccessModalProps = {
  closable?: boolean;
  children?: ReactNode;
} & Partial<ModalWrapperProps>;

export const AccessModal: ModalComponentType<AccessModalProps> = ({
  open,
  closable,
  onClose,
  children,
  ...props
}) => {
  const { back, push } = useRouter();
  const { prevRoute } = useSidebarActions();

  const handleGoBack = async () => {
    if (prevRoute) {
      back();
    } else {
      await push(STATISTICS_PATH);
    }
    onClose?.();
  };

  return (
    <ModalWrapper
      title="No Access"
      {...props}
      closable={closable}
      open={open || false}
      onClose={handleGoBack}
    >
      <Stack alignItems="center">
        <Icons.LargeWarning />
        <Title>You do not have permission to view this page</Title>
        <Button
          fullWidth
          color="secondary"
          onClick={handleGoBack}
          sx={{ mt: 4 }}
        >
          OK
        </Button>
      </Stack>
    </ModalWrapper>
  );
};

export const useAccessModal = getUseModal(AccessModal);
