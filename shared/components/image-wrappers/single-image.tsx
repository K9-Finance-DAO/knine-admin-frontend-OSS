import { DEFAULT_SIZE, defaultOpts, ImgOpts, ImgProps } from './shared';
import Image from 'next/image';

export const SingleImage = ({
  contentImg,
  imgOpts = defaultOpts,
}: {
  contentImg: ImgProps;
  imgOpts?: ImgOpts;
}) => (
  <Image
    src={contentImg.src}
    alt={contentImg.alt}
    width={imgOpts?.width || DEFAULT_SIZE}
    height={imgOpts?.height || DEFAULT_SIZE}
    style={{ marginRight: '8px' }}
    {...imgOpts}
  />
);
