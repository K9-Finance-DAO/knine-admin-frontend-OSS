import { PropsWithChildren } from 'react';

import { ImagesGrouped } from './image-grouped';
import { ImageBox, type IProps } from './shared';
import { SingleImage } from './single-image';

export const ImageWrapper = ({
  children,
  contentImg,
  imgOpts,
  stackProps,
}: PropsWithChildren & IProps) => {
  const ImageComponent = Array.isArray(contentImg)
    ? ImagesGrouped
    : SingleImage;

  return (
    <ImageBox {...stackProps} sx={{ ...stackProps?.sx }}>
      <ImageComponent contentImg={contentImg as any} imgOpts={imgOpts} />
      {children}
    </ImageBox>
  );
};
