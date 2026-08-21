import { Box, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { Icons } from 'shared/components';
import { SidebarItemsList } from './components/sidebar-items-list';
import { DrawerStyled, SidebarHeader, ToggleButton } from './styles';
import { SidebarBottomBlock } from './components/sidebar-bottom-block';
import { useSidebarActions } from 'providers/sidebar-provider';

type SidebarProps = {
  subtitle: string;
};

export const Sidebar = ({ subtitle }: SidebarProps) => {
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebarActions();
  const theme = useTheme();

  return (
    <DrawerStyled
      variant="permanent"
      isOpen={isSidebarOpen}
      onClose={closeSidebar}
    >
      <SidebarHeader open={isSidebarOpen}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box position="relative" width={40} height={40}>
            <Image src="/logo.webp" alt="knine logo" fill />
          </Box>
          {isSidebarOpen && (
            <Stack spacing={0.5}>
              <Typography
                variant="caption"
                className="sm"
                textTransform="uppercase"
              >
                K9 Finance
              </Typography>
              <Typography
                variant="caption"
                className="xs"
                color={theme.palette.colorScheme.gray}
              >
                {subtitle}
              </Typography>
            </Stack>
          )}
        </Stack>
        <ToggleButton
          outside={!isSidebarOpen}
          onClick={isSidebarOpen ? closeSidebar : openSidebar}
        >
          <Icons.ChevronArrow />
        </ToggleButton>
      </SidebarHeader>
      <SidebarItemsList isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && <SidebarBottomBlock />}
    </DrawerStyled>
  );
};
