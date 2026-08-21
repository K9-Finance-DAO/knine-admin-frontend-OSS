import { Stack, StackProps, Tooltip } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';
import { HelperIcon, RowTitleStyle, RowValueStyle } from './styles';
import { InlineLoader } from '@lidofinance/lido-ui';

export type DataTableRowProps = {
  title: ReactNode;
  help?: ReactNode;
  loading?: boolean;
  highlight?: boolean;
  textColor?: string;
} & PropsWithChildren &
  Omit<StackProps, 'title'>;

export const DataTableRow = ({
  title,
  loading = false,
  highlight = false,
  help,
  children,
  textColor,
  ...rest
}: DataTableRowProps) => {
  const hasHelper = !!help;

  return (
    <Stack direction="row" alignItems="center" {...rest}>
      <RowTitleStyle>
        {title}
        {hasHelper && (
          <Tooltip title={help} placement="right-start">
            <HelperIcon />
          </Tooltip>
        )}
      </RowTitleStyle>
      <RowValueStyle $highlight={highlight} $textColor={textColor}>
        {loading ? <InlineLoader /> : children}
      </RowValueStyle>
    </Stack>
  );
};
