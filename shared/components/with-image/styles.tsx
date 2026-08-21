import { Box, styled } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { COLOR_BLUE_DEEP_INDIGO } from 'styles';

export const ImagesMultipleWrapper = styled(Box)(({ theme }) => ({
  '& > div, img': {
    borderRadius: '50%',
    boxShadow: '0px 2px 8.7px 0px rgba(0, 0, 0, 0.25)',
  },
  '&:not(:first-of-type)': {
    marginLeft: '-7px',
  },

  '&:last-of-type': {
    marginRight: theme.spacing(1),
  },
}));

export const ImageWithFallback = ({
  src,
  alt = '',
  ...rest
}: Partial<ImageProps>) => {
  if (!src) {
    return (
      <ImagesMultipleWrapper>
        <Box
          width={rest.width}
          height={rest.height}
          bgcolor={COLOR_BLUE_DEEP_INDIGO}
        />
      </ImagesMultipleWrapper>
    );
  }

  return (
    <ImagesMultipleWrapper width={rest.width} height={rest.height}>
      <Image src={src} alt={alt} {...rest} />
    </ImagesMultipleWrapper>
  );
};
