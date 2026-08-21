import { styled } from '@mui/material';
import { Spinner } from 'shared/components/loaders/spinner';

export const ButtonLoaderStyle = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: currentcolor;
  pointer-events: none;
`;
