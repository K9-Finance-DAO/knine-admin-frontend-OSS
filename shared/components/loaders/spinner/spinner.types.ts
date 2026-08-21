import { BoxProps } from '@mui/material';

export enum SpinnerSize {
  small = 25,
  medium = 56,
  large = 105,
}

export const thicknessMap = {
  small: 3,
  medium: 5,
  large: 9,
} as const;

export type LoaderSizes = keyof typeof SpinnerSize;

export type SpinnerProps = {
  size?: LoaderSizes;
  color?: string;
  thickness?: number;
} & BoxProps;

export type CircleProps = { strokeWidth: number; r?: number };
