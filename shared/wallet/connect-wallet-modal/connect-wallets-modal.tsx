import { useRnbWeb3Context, useRnbWeb3Modal } from 'rnb-web3/core-react';

import { WalletsListModal } from './modals/wallets-list-modal';
import { RequirementsModal } from './modals/requirements-modal';
import { EagerModal } from './modals/eager-modal';

export const ConnectWalletsModal = () => {
  const { walletDataList } = useRnbWeb3Context();
  const { currentModal, closeModal } = useRnbWeb3Modal();

  const onCloseSuccess = () => closeModal({ success: true });
  const onCloseReject = () => closeModal({ success: false });

  switch (currentModal?.type) {
    case 'wallet':
      return (
        <WalletsListModal
          open
          onReject={onCloseReject}
          onSuccess={onCloseSuccess}
          walletDataList={walletDataList}
        />
      );

    case 'requirements':
      return (
        <RequirementsModal
          open
          onSuccess={onCloseSuccess}
          onReject={onCloseReject}
          payload={currentModal?.props}
        />
      );

    case 'eager':
      return (
        <EagerModal
          open
          onSuccess={onCloseSuccess}
          onReject={onCloseReject}
          payload={currentModal?.props}
        />
      );

    default:
      return null;
  }
};
