import { Box, styled, TypographyOwnProps } from '@mui/material';

type LogoWithTitleTypography = {
  variant: TypographyOwnProps['variant'];
  className?: string;
};

type LogoWithTitleSizeProps = {
  width: number;
  height: number;
  titleTypography: LogoWithTitleTypography;
  subtitleTypography: LogoWithTitleTypography;
};

type LogoWithTitleSizes = 'sm' | 'lg';
export const mapSizeToParams: Record<
  LogoWithTitleSizes,
  LogoWithTitleSizeProps
> = {
  sm: {
    width: 40,
    height: 40,
    titleTypography: {
      variant: 'caption',
      className: 'sm',
    },
    subtitleTypography: {
      variant: 'caption',
      className: 'xs',
    },
  },
  lg: {
    width: 48,
    height: 48,
    titleTypography: {
      variant: 'body2',
      className: 'lg',
    },
    subtitleTypography: {
      variant: 'body1',
    },
  },
};

// tag Image from Next.js badly works with pseudo-elements, so we need to wrap it in a Box with shadow
export const LogoShadowBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  zIndex: 10,
  boxShadow: '0px -4px 8px 0px #FFFFFFA3 inset',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
