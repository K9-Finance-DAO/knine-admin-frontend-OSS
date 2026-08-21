import { Children, FC, ReactNode, useMemo } from 'react';
import { Grid, GridBreakpointsType, GridProps } from '@mui/material';
import {
  defaultSpacingConfig,
  DEFAULT_MAX_COLUMNS_SIZE,
  DEFAULT_XS_ITEM_SPACE,
} from './constants';
import { DividerStyled } from './styles';

export interface DashboardSplitCardContainerProps
  extends Omit<GridProps, 'columns'> {
  children?: ReactNode;
  columns: GridBreakpointsType;
  gridItemProps?: GridProps;
  spacingConfig?: GridBreakpointsType;
}

export const DashboardSplitCardContainer: FC<
  DashboardSplitCardContainerProps
> = ({
  children,
  columns,
  gridItemProps,
  spacingConfig = defaultSpacingConfig,
}) => {
  const childrenLength = Children.count(children);
  const rows = childrenLength / (columns?.xs ?? DEFAULT_XS_ITEM_SPACE);

  const columnsSpacings = useMemo(
    () =>
      Object.entries(columns).map(([breakpoint, column]) => [
        breakpoint,
        DEFAULT_MAX_COLUMNS_SIZE / column,
      ]),
    [columns],
  );

  return (
    <Grid container spacing={spacingConfig}>
      {Children.map(children, (element, index) => {
        return (
          <Grid
            item
            position="relative"
            {...Object.fromEntries(columnsSpacings)}
            {...gridItemProps}
          >
            {element}
            <DividerStyled
              spaceConfig={spacingConfig}
              className="stroke"
              sx={(theme) => ({
                display: index === childrenLength - 1 ? 'none' : 'block',
                [theme.breakpoints.between('xs', 'md')]: {
                  display: index > rows ? 'none' : 'block',
                },
              })}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
