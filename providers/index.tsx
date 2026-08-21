import { FC, PropsWithChildren } from 'react';
import { CookieThemeProvider } from '@lidofinance/lido-ui';

import { AppFlagProvider } from './app-flag';
import { ClientConfigProvider } from './client-config';
import { InpageNavigationProvider } from './inpage-navigation';
import { ModalProvider } from './modal-provider';
import Web3Provider from './web3';
import { ThemeProvider } from './theme-provider';
import { SidebarProvider } from './sidebar-provider';
import { AdminAccessProvider } from './admin-access';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ClientConfigProvider>
    <AppFlagProvider>
      <CookieThemeProvider>
        <ThemeProvider>
          <Web3Provider>
            <InpageNavigationProvider>
              <SidebarProvider>
                <ModalProvider>
                  <AdminAccessProvider>{children}</AdminAccessProvider>
                </ModalProvider>
              </SidebarProvider>
            </InpageNavigationProvider>
          </Web3Provider>
        </ThemeProvider>
      </CookieThemeProvider>
    </AppFlagProvider>
  </ClientConfigProvider>
);
