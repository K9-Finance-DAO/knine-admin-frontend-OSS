import {
  Box,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { sidebarNavItems } from '../../constants';
import { FC, PropsWithChildren, ReactElement, useCallback } from 'react';
import {
  ChevronArrowWrapper,
  SidebarNavLinkActiveMarker,
  SidebarNavLinkContent,
  SidebarNavLink,
} from './styles';
import { FontWeights } from 'styles';
import { useRouter } from 'next/router';

const SidebarNavLinkWrapper: FC<
  PropsWithChildren & { title: string; isOpen: boolean }
> = ({ children, title, isOpen }) => {
  if (isOpen) return <Box component="li">{children}</Box>;
  return (
    <Tooltip
      placement="left"
      title={title}
      sx={{ fontWeight: FontWeights.Medium }}
    >
      <Box component="li">{children as ReactElement}</Box>
    </Tooltip>
  );
};

type SidebarItemsListProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SidebarItemsList = ({
  isOpen,
  onClose,
}: SidebarItemsListProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { push, pathname } = useRouter();

  const handleNavigate = useCallback(
    async (path: string, query?: Record<string, string>) => {
      if (isOpen && isSmallScreen) {
        onClose();
      }
      await push({ pathname: path, ...(query && { query }) });
    },
    [isOpen, isSmallScreen, onClose, push],
  );

  return (
    <Stack flex={1}>
      {sidebarNavItems.map(({ key, label, icon, subitems }) => (
        <Stack
          component="nav"
          key={key}
          mt={isOpen ? 2.5 : 1}
          spacing={isOpen ? 2 : 0}
        >
          {isOpen && (icon || label) && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {icon}
              <Typography
                variant="caption"
                className="xs medium"
                color={theme.palette.colorScheme.base}
                textTransform="uppercase"
              >
                {label}
              </Typography>
            </Stack>
          )}
          <Stack
            component="ul"
            role="navigation"
            aria-label="page-navigation"
            spacing={0.5}
            sx={{ listStyleType: 'none' }}
          >
            {subitems.map(({ name, path, query, icon, iconActive }) => {
              const isActive =
                pathname === path || (path !== '' && pathname.includes(path));
              return (
                <SidebarNavLinkWrapper key={name} title={name} isOpen={isOpen}>
                  <SidebarNavLink
                    component="a"
                    tabIndex={0}
                    isActive={isActive}
                    onClick={() => handleNavigate(path, query)}
                  >
                    {isActive && <SidebarNavLinkActiveMarker />}
                    <SidebarNavLinkContent isActive={isActive}>
                      {isActive ? iconActive ?? icon : icon}
                      {isOpen && (
                        <Typography
                          className="medium"
                          color={theme.palette.colorScheme.graySecondary}
                        >
                          {name}
                        </Typography>
                      )}
                    </SidebarNavLinkContent>
                    {isActive && isOpen && <ChevronArrowWrapper />}
                  </SidebarNavLink>
                </SidebarNavLinkWrapper>
              );
            })}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
