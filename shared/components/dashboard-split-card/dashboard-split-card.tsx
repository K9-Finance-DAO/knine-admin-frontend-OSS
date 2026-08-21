import { BorderedBox } from '../bordered-box';
import { FC, PropsWithChildren, ReactNode } from 'react';
import {
  DashboardSplitCardContainer,
  type DashboardSplitCardContainerProps,
} from './dashboard-card-container';
import { SxProps } from '@mui/material';

interface DashboardSplitCardProps {
  boxSx?: SxProps;
  innerSlot?: ReactNode;
}

export const DashboardSplitCard: FC<
  PropsWithChildren & DashboardSplitCardContainerProps & DashboardSplitCardProps
> = ({ children, boxSx, innerSlot = null, ...rest }) => {
  return (
    <BorderedBox sx={boxSx}>
      <DashboardSplitCardContainer {...rest}>
        {children}
      </DashboardSplitCardContainer>
      {innerSlot}
    </BorderedBox>
  );
};
