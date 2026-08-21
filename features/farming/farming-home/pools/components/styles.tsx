import { Button, Typography, styled, Box } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { BORDER_RADIUS_S, COLOR_BLUE_DEEP_INDIGO } from 'styles';

export const FarmingBonusTypography = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  width: 'fit-content',
  border: `1px solid ${theme.palette.colorScheme.orangeMid}`,
  lineHeight: `24px`,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  borderRadius: BORDER_RADIUS_S,
  minWidth: 80,
  textAlign: 'center',
}));

export const FarmingAddress = styled(Typography)(({ theme }) => ({
  color: theme.palette.colorScheme.graySecondary,
  lineHeight: '28px',
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.colorScheme.black,
  border: `1px solid ${theme.palette.colorScheme.stroke}`,
  borderRadius: BORDER_RADIUS_S,
}));

export const EditButton = styled(Button)(({ theme }) => ({
  svg: {
    fill: theme.palette.colorScheme.graySecondary,
  },
}));

export const FarmingItemImageFallback = styled(Box)({
  display: 'block',
  width: 144,
  height: 144,
  borderRadius: BORDER_RADIUS_S,
  background: COLOR_BLUE_DEEP_INDIGO,
  opacity: 0.9,
});

export const BottomInfo = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '100px 160px repeat(3, 1fr)',
  columnGap: '40px',
});

export type FarmingImageWithFallbackProps = {
  src?: string;
  alt: string;
  radius?: string;
} & Partial<ImageProps>;

export const FarmingImageWithFallback = ({
  src,
  alt,
  height = 144,
  width = 144,
  radius = BORDER_RADIUS_S,
}: FarmingImageWithFallbackProps) => {
  if (!src) {
    return <FarmingItemImageFallback borderRadius={radius} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ borderRadius: radius, objectFit: 'cover' }}
    />
  );
};
