import { Box, IconButton } from '@mui/material';
import Image from 'next/image';

import {
  HeaderStyle,
  HeaderActionsStyle,
  HeaderActionsMobileStyle,
} from './styles';
import HeaderWallet from './components/header-wallet';
import { HeaderContent } from './components/header-content';
import Icons from 'shared/components/icons';
import { memo } from 'react';
import { useSidebarActions } from 'providers/sidebar-provider';

const OpenSidebarButton = memo(() => {
  const { openSidebar } = useSidebarActions();

  return (
    <IconButton className="transparent noPadding" onClick={openSidebar}>
      <Icons.Burger />
    </IconButton>
  );
});

export const Header = () => {
  return (
    <Box component="header">
      <HeaderStyle>
        <HeaderContent />
        <HeaderActionsStyle>
          <HeaderActionsMobileStyle>
            <OpenSidebarButton />
            <Image
              src="/logo.webp"
              alt="K9 logo"
              width={36}
              height={36}
              sizes="160w"
            />
          </HeaderActionsMobileStyle>
          <HeaderWallet />
        </HeaderActionsStyle>
      </HeaderStyle>
    </Box>
  );
};
