import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import MainLogo from 'public/logo.webp';
import { LogoShadowBox, mapSizeToParams } from './styles';

type LogoWithTitleProps = {
  size: keyof typeof mapSizeToParams;
  subtitle: string;
  isOpen?: boolean;
};

export const LogoWithTitle = ({
  size,
  subtitle,
  isOpen = true,
}: LogoWithTitleProps) => {
  const { width, height, titleTypography, subtitleTypography } =
    mapSizeToParams[size];

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Box position="relative" width={width} height={height}>
        {!isOpen && <LogoShadowBox />}
        <Image src={MainLogo} alt="knine logo" width={width} height={height} />
      </Box>
      {isOpen && (
        <Stack spacing={0.5}>
          <Typography {...titleTypography} textTransform="uppercase">
            K9 Finance
          </Typography>
          {subtitle && (
            <Typography
              {...subtitleTypography}
              color={(theme) => theme.palette.colorScheme.gray}
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
      )}
    </Stack>
  );
};
