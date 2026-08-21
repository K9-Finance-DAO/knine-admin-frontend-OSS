import { createContext, memo, useContext, useEffect, useMemo } from 'react';
import { useWeb3 } from 'rnb-web3/web3-react';
import {
  useAccountAdminRoles,
  useAdminAccess,
  useAuthToken,
} from 'shared/hooks';
import { useAccessModal } from 'shared/access-modal';
import { HOME_PATH, STATISTICS_PATH } from 'config/urls';
import { useSidebarActions } from './sidebar-provider';
import { useDisconnect } from 'rnb-web3/core-react';
import { useRouter } from 'next/router';
import { showToastMessage } from '../utils';

type AdminAccessContextValue = {
  isDefaultAdmin: boolean;
  isAdmin: boolean;
};

export const AdminAccessContext = createContext({} as AdminAccessContextValue);

export const useAdminAccessContext = () => {
  const { isAdmin, isDefaultAdmin } = useContext(AdminAccessContext);
  return { isAdmin, isDefaultAdmin };
};

const showNoAccessToast = () => {
  showToastMessage('error', 'You don`t have access to admin dashboard', {
    toastId: 1,
  });
};

const AdminAccessProviderRaw = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { push, back, pathname } = useRouter();
  const { account, active } = useWeb3();
  const { data: adminAccess } = useAdminAccess();
  const { data: accountAdminRoles } = useAccountAdminRoles();
  const { openModal, closeModal } = useAccessModal();
  const { prevRoute } = useSidebarActions();
  const { disconnect } = useDisconnect();
  const { removeAuthToken, authToken } = useAuthToken();

  const context = useMemo(
    () => ({
      isDefaultAdmin: adminAccess?.isDefaultAdmin ?? true,
      isAdmin: adminAccess?.isAdmin ?? true,
    }),
    [adminAccess?.isAdmin, adminAccess?.isDefaultAdmin],
  );

  useEffect(() => {
    if (
      account &&
      active &&
      adminAccess &&
      !adminAccess.isDefaultAdmin &&
      !adminAccess.isAdmin
    ) {
      openModal({ closable: true });
    } else {
      closeModal();
    }
  }, [account, active, adminAccess, closeModal, openModal]);

  useEffect(() => {
    // check if auth token exists (if user was connected before) else go to Login page
    if (authToken) {
      // check if a user is connected or no need to act (check `shared/components/layout`)
      if (account && active && accountAdminRoles) {
        // check when a user is connected and has admin roles, or he has no access to admin dashboard
        if (Object.keys(accountAdminRoles).length > 0) {
          // move to a previous path if user was disconnected and redirected to Login page before
          if (pathname === HOME_PATH) {
            if (prevRoute) void back();
            else void push(STATISTICS_PATH);
          }
        } else {
          disconnect?.();
          removeAuthToken();
          showNoAccessToast();
        }
      }
    } else if (pathname !== HOME_PATH) {
      void push(HOME_PATH);
      showNoAccessToast();
    }
  }, [
    account,
    accountAdminRoles,
    active,
    authToken,
    back,
    disconnect,
    pathname,
    prevRoute,
    push,
    removeAuthToken,
  ]);

  return (
    <AdminAccessContext.Provider value={context}>
      {children}
    </AdminAccessContext.Provider>
  );
};

export const AdminAccessProvider = memo(AdminAccessProviderRaw);
