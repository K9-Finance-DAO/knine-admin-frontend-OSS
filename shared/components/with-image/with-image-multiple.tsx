import { Stack, StackProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { ImageProps } from 'next/image';
import { ImageWithFallback } from './styles';

interface WithImageMultipleProps {
  imagesProps: (ImageProps & {
    width?: number;
    height?: number;
    text?: string;
  })[];
  stackProps?: StackProps;
}

const DEFAULT_SIZE = 25;

export const WithImageMultiple = ({
  imagesProps,
  stackProps,
}: PropsWithChildren & WithImageMultipleProps) => {
  const unionText = imagesProps.map((imageItem) => imageItem.text).join('/');

  return (
    <Stack
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="center"
      {...stackProps}
    >
      {imagesProps.map((imagePropsItem, idx) => (
        <ImageWithFallback
          {...imagePropsItem}
          key={idx}
          width={imagePropsItem?.width ?? DEFAULT_SIZE}
          height={imagePropsItem?.height ?? DEFAULT_SIZE}
          alt={imagePropsItem.alt}
        />
      ))}

      {unionText}
    </Stack>
  );
};
