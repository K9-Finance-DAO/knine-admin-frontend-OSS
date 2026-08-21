import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

import invariant from 'tiny-invariant';
import { CurrentPool } from '../types';

interface DrawerContextValue {
  isOpen: boolean;
  selectedPool: CurrentPool | null;
  isEditing: boolean;
  openEditForm: (poolInfo: CurrentPool) => void;
  closeDrawer: () => void;
  openCreateForm: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);
DrawerContext.displayName = 'DrawerContext';

export const FormDrawerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<CurrentPool | null>(null);

  const openEditForm = useCallback((poolInfo: CurrentPool) => {
    setSelectedPool(poolInfo);
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setSelectedPool(null);
    setIsDrawerOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen: isDrawerOpen,
      selectedPool,
      isEditing: selectedPool !== null,
      openEditForm,
      closeDrawer,
      openCreateForm: () => setIsDrawerOpen(true),
    }),
    [selectedPool, isDrawerOpen, openEditForm, closeDrawer],
  );
  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export const useFormDrawer = () => {
  const r = useContext(DrawerContext);
  invariant(r, 'useFormDrawer was used outside of DrawerContext');
  return r;
};
