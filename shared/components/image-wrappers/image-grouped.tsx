import Image from 'next/image';
import {
  type GroupedImages,
  type IProps,
  ImageBox,
  defaultOpts,
  DEFAULT_SIZE,
} from './shared';

export const ImagesGrouped = ({
  contentImg,
  imgOpts = defaultOpts,
  stackProps,
}: IProps & { contentImg: GroupedImages }) => {
  const imageSize = imgOpts?.size ?? DEFAULT_SIZE;
  return (
    <ImageBox
      component="figure"
      sx={{
        position: 'relative',
        width:
          contentImg.length > 1
            ? imageSize + (imageSize / 2) * (contentImg.length - 1)
            : 'unset',
      }}
      {...stackProps}
    >
      {contentImg.map(({ src, alt }, index) => {
        const lastElement = contentImg.length - 1;
        return (
          <Image
            key={alt + index}
            src={src}
            alt={alt}
            width={imageSize}
            height={imageSize}
            {...imgOpts}
            style={{
              position: 'relative',
              zIndex: index + 1 - lastElement,
              left: index > 0 ? -(imageSize / 2) * index : 'unset', // [unset, -12, -24]
              marginRight: index === lastElement ? '8px' : 0,
            }}
          />
        );
      })}
    </ImageBox>
  );
};
