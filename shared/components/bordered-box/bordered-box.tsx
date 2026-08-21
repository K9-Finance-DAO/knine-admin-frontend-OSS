import { Stack, StackProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { borderRadiusMap, COLOR_DARK_SECONDARY, COLOR_STROKE } from 'styles';

const thicknessConfig = {
  small: 2,
  medium: { xxs: 1.5, xs: 2, md: 3 },
};

export interface BorderedBoxProps {
  paddingThickness?: keyof typeof thicknessConfig;
  borderRadiusSize?: keyof typeof borderRadiusMap;
}

export const BorderedBox: FC<
  BorderedBoxProps & StackProps & PropsWithChildren
> = ({
  paddingThickness = 'small',
  borderRadiusSize = 'lg',
  children,
  ...rest
}) => {
  const { sx, ...stackProps } = rest;

  return (
    <Stack
      padding={thicknessConfig[paddingThickness]}
      sx={{
        width: '100%',
        border: `1.5px solid ${COLOR_STROKE}`,
        borderRadius: borderRadiusMap[borderRadiusSize],
        background: COLOR_DARK_SECONDARY,
        ...rest?.sx,
      }}
      {...stackProps}
    >
      {children}
    </Stack>
  );
};
