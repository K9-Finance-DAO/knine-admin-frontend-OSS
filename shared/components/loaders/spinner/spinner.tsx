import { ForwardedRef, forwardRef } from 'react';
import {
  SpinnerCircleBackground,
  SpinnerCircleForeground,
  SpinnerWrapper,
} from 'shared/components/loaders/spinner/spinner.helper';

import {
  SpinnerProps,
  SpinnerSize,
  thicknessMap,
} from 'shared/components/loaders/spinner/spinner.types';
import { COLOR_ORANGE_MID } from 'styles';

export const Spinner = forwardRef(
  (
    {
      size = 'medium',
      thickness,
      color = COLOR_ORANGE_MID,
      ...rest
    }: SpinnerProps,
    ref?: ForwardedRef<HTMLDivElement>,
  ) => {
    const pxSize = SpinnerSize[size];
    const center = pxSize / 2;
    const strokeThickness = thickness || thicknessMap[size];
    const radius = center - strokeThickness / 2;

    return (
      <SpinnerWrapper size={pxSize} color={color} {...rest} ref={ref}>
        <svg width={pxSize} height={pxSize} viewBox={`0 0 ${pxSize} ${pxSize}`}>
          <SpinnerCircleBackground
            strokeWidth={strokeThickness}
            cx={center}
            cy={center}
            r={radius}
          />
          <SpinnerCircleForeground
            strokeWidth={strokeThickness}
            cx={center}
            cy={center}
            r={radius}
          />
        </svg>
      </SpinnerWrapper>
    );
  },
);

Spinner.displayName = 'Spinner';
