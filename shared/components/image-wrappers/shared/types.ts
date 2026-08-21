import { ImageProps } from 'next/image';
import { StackProps } from '@mui/material';

export type ImgProps = Pick<ImageProps, 'src' | 'alt'>;

export type ImgOpts = { size?: number } & Omit<ImageProps, 'src' | 'alt'>;

export type GroupedImages = Array<ImgProps>;
export type SingleImage = ImgProps;

export interface IProps {
  contentImg: SingleImage | GroupedImages;
  imgOpts?: ImgOpts;
  stackProps?: StackProps;
}
