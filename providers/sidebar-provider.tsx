import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';

type SidebarContextValue = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  prevRoute?: string;
};

const SidebarContext = createContext({} as SidebarContextValue);

export const useSidebarActions = () => {
  const { isSidebarOpen, openSidebar, closeSidebar, prevRoute } =
    useContext(SidebarContext);
  return { isSidebarOpen, openSidebar, closeSidebar, prevRoute };
};

const SidebarProviderRaw = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { events } = useRouter();
  const [prevRoute, setPrevRoute] = useState<string>();

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const context = useMemo(
    () => ({
      isSidebarOpen,
      openSidebar,
      closeSidebar,
      prevRoute,
    }),
    [isSidebarOpen, openSidebar, closeSidebar, prevRoute],
  );

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setPrevRoute(url);
    };
    events.on('routeChangeComplete', handleRouteChange);
    return () => {
      events.off('routeChangeComplete', handleRouteChange);
    };
  }, [events]);

  return (
    <SidebarContext.Provider value={context}>
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarProvider = memo(SidebarProviderRaw);
