import { InputAdornment, Stack, Typography } from '@mui/material';
import { Icons } from 'shared/components';
import { EditButton } from './styles';
import { ReactNode } from 'react';

export type CustomInputDecoratorProps = {
  isEditable?: boolean;
  isPercent?: boolean;
  customIcon?: ReactNode;
  onEditClick?: () => void;
  tokenSymbol?: string;
  isEditActive?: boolean;
};

export const CustomInputDecorator = ({
  isEditable,
  isPercent,
  customIcon,
  onEditClick,
  tokenSymbol,
  isEditActive,
}: CustomInputDecoratorProps) => {
  return (
    <InputAdornment position="end">
      <Stack direction="row" spacing={1}>
        {tokenSymbol && <Typography>{tokenSymbol}</Typography>}
        {isPercent && <Icons.Percent />}
        {customIcon}
        {isEditable && (
          <EditButton
            active={!!isEditActive}
            className="transparent noPadding"
            onClick={onEditClick}
          >
            <Icons.Edit />
          </EditButton>
        )}
      </Stack>
    </InputAdornment>
  );
};
