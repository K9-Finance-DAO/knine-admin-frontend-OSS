import { Stack, StackProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { ImageProps } from 'next/image';
import { ImageWithFallback } from 'shared/components/with-image/styles';

interface WithImageProps {
  imageProps: ImageProps & { width?: number; height?: number };
  stackProps?: StackProps;
}

const DEFAULT_SIZE = 25;

export const WithImage = ({
  children,
  imageProps,
  stackProps,
}: PropsWithChildren & WithImageProps) => {
  return (
    <Stack
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="center"
      {...stackProps}
    >
      <ImageWithFallback
        {...imageProps}
        width={imageProps?.width || DEFAULT_SIZE}
        height={imageProps?.height || DEFAULT_SIZE}
        style={{ marginRight: '8px' }}
      />
      {children}
    </Stack>
  );
};
