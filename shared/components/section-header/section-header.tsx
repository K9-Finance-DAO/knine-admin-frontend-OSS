import { Stack, StackProps, Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';
import { FormControlGroupButtons } from '../form-control-group-buttons';

type SectionHeaderProps = {
  title: string;
  actionsSlot?: ReactNode;
  titleProps?: TypographyProps;
  titleClassName?: string;
};

export const SectionHeader = ({
  title,
  titleProps,
  titleClassName,
  actionsSlot,
  ...stackProps
}: SectionHeaderProps & StackProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      pb={2}
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.colorScheme.stroke}`,
      })}
      {...stackProps}
    >
      <Typography
        className={titleClassName ?? 'medium gray-secondary'}
        {...titleProps}
      >
        {title}
      </Typography>

      <FormControlGroupButtons>{actionsSlot}</FormControlGroupButtons>
    </Stack>
  );
};
