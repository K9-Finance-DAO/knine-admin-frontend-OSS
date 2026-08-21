import { useTheme } from '@mui/material';
import { Icons } from '..';
import { BackLink as BackLinkStyled, BackLinkIcon } from './styles';
import { LinkProps } from 'next/link';
import { memo, PropsWithChildren } from 'react';

export const BackLink = memo(
  ({ href, children }: LinkProps & PropsWithChildren) => {
    const theme = useTheme();

    return (
      <BackLinkStyled href={href}>
        <BackLinkIcon>
          <Icons.ArrowUp
            fill={theme.palette.colorScheme.base}
            width={18}
            height={18}
          />
        </BackLinkIcon>

        {children}
      </BackLinkStyled>
    );
  },
);

BackLink.displayName = 'BackLink';
