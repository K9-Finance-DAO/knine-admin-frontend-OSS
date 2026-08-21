import { Icons } from 'shared/components';
import { COLOR_GRAY } from 'styles';
import { Button, ButtonProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ReactNode } from 'react';

type ClearFormButtonProps = {
  text?: string;
  iconSlot?: ReactNode;
  onClick?: () => void;
};

export const ClearFormButton = ({
  text = 'Delete',
  iconSlot,
  onClick,
  ...props
}: ClearFormButtonProps & Omit<ButtonProps, 'onClick'>) => {
  const { reset, formState } = useFormContext();

  const btnIcon =
    iconSlot !== undefined ? iconSlot : <Icons.TrashBin fill={COLOR_GRAY} />;

  const handleClearForm = () => {
    reset(formState.defaultValues);
    onClick?.();
  };

  return (
    <Button
      startIcon={btnIcon}
      sx={{ width: 110 }}
      onClick={handleClearForm}
      {...props}
    >
      {text}
    </Button>
  );
};
