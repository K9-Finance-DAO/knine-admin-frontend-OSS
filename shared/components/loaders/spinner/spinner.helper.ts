import { Box, keyframes, styled } from '@mui/material';
import { CircleProps } from './spinner.types';

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled(Box)<{ size: number }>(({ size }) => ({
  width: `${size}px`,
  height: `${size}px`,
  margin: 0,
  padding: 0,
  lineHeight: 0,
}));

const CircleBase = styled('circle')<CircleProps>(({ strokeWidth }) => ({
  fill: 'none',
  stroke: 'currentcolor',
  strokeWidth: `${strokeWidth}px`,
}));

export const SpinnerCircleBackground = styled(CircleBase)<CircleProps>({
  opacity: 0.2,
});

export const SpinnerCircleForeground = styled(CircleBase)<
  Required<CircleProps>
>(({ r }) => ({
  strokeLinecap: 'round',
  strokeDasharray: (() => {
    const circumference = 2 * r * Math.PI;
    const filledPart = 0.25;
    return `${circumference * filledPart} ${circumference * (1 - filledPart)}`;
  })(),
  transform: 'rotate(0deg)',
  transformOrigin: '50% 50%',
  animation: `${rotation} 1.4s linear infinite`,
}));
