import { FC, memo } from 'react';
import { Stake } from '@lidofinance/lido-ui';

import { HOME_PATH, getPathWithoutFirstSlash } from 'config/urls';
import { LocalLink } from 'shared/components/local-link';
import { useRouterPath } from 'shared/hooks/use-router-path';

import { Nav, NavLink } from './styles';

const routes = [
  {
    name: 'Stake',
    path: HOME_PATH,
    icon: <Stake data-testid="navStake" />,
    exact: true,
  },
];
export const Navigation: FC = memo(() => {
  const pathname = useRouterPath();
  let pathnameWithoutQuery = pathname.split('?')[0];
  if (pathnameWithoutQuery[pathnameWithoutQuery.length - 1] === '/') {
    // Remove last '/'
    pathnameWithoutQuery = pathnameWithoutQuery.slice(0, -1);
  }

  return (
    <Nav>
      {routes.map(({ name, path, icon }) => {
        const isActive =
          pathnameWithoutQuery === getPathWithoutFirstSlash(path) ||
          (path.length > 1 && pathnameWithoutQuery.startsWith(path));

        return (
          <LocalLink key={path} href={path}>
            <NavLink active={isActive}>
              {icon}
              <span>{name}</span>
            </NavLink>
          </LocalLink>
        );
      })}
    </Nav>
  );
});
