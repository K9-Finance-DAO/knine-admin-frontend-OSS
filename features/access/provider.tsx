import { AdminRole } from './types';
import { CHAINS } from '@knine-sdk/constants';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { AccessTab } from './index';
import {
  AccessContractType,
  useAllAdminRoles,
  useContractAdminRoles,
} from './hooks';
import { useSDK } from '@knine-sdk/react';

type AccessDataContextValue = {
  adminRoles?: AdminRole[];
  contractAdminRoles?: AdminRole;
  isDefaultAdmin: boolean;
  currentChainId: CHAINS;
  contractAddress?: string;
  loading: boolean;
  updateAccessData: () => Promise<void>;
};

export const AccessDataContext = createContext({} as AccessDataContextValue);

export const useAccessDataContext = () => useContext(AccessDataContext);

export const AccessDataProvider = ({
  children,
  activeTab,
}: PropsWithChildren<{ activeTab: AccessTab }>) => {
  const {
    data: allAdminRoles,
    initialLoading: isAllAdminRolesLoading,
    update: updateAllAdminRoles,
  } = useAllAdminRoles();
  const {
    data: accessContractData,
    initialLoading: isAccessContractDataLoading,
    update: updateAccessContractData,
  } = useContractAdminRoles(AccessContractType[activeTab]);
  const { account, chainId } = useSDK();

  const isDefaultAdmin = useMemo(
    () =>
      !!allAdminRoles &&
      !!accessContractData &&
      !!chainId &&
      chainId === accessContractData.chainId &&
      allAdminRoles[accessContractData.contractAddress]?.some((admin) =>
        Object.entries(admin)?.some(
          ([address, role]) =>
            address === account && role === 'DEFAULT_ADMIN_ROLE',
        ),
      ),
    [accessContractData, account, allAdminRoles, chainId],
  );

  const updateAccessData = useCallback(async () => {
    await updateAllAdminRoles();
    await updateAccessContractData();
  }, [updateAccessContractData, updateAllAdminRoles]);

  const context: AccessDataContextValue = useMemo(
    () => ({
      adminRoles: allAdminRoles?.[accessContractData?.contractAddress ?? 0],
      contractAdminRoles: accessContractData?.adminRoles,
      isDefaultAdmin,
      currentChainId: accessContractData?.chainId ?? chainId,
      contractAddress: accessContractData?.contractAddress,
      loading: isAccessContractDataLoading || isAllAdminRolesLoading,
      updateAccessData,
    }),
    [
      accessContractData?.adminRoles,
      accessContractData?.chainId,
      accessContractData?.contractAddress,
      allAdminRoles,
      chainId,
      isAccessContractDataLoading,
      isAllAdminRolesLoading,
      isDefaultAdmin,
      updateAccessData,
    ],
  );

  return (
    <AccessDataContext.Provider value={context}>
      {children}
    </AccessDataContext.Provider>
  );
};
