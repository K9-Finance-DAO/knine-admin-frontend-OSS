import { Button, Stack, StackProps, useTheme } from '@mui/material';
import { Icons } from '..';
import { useState } from 'react';

type InputActionsProps = {
  withEdit?: boolean;
  onSave?: () => void;
  onCancel: () => void;
  onEdit?: () => void;
} & StackProps;

export const InputActionsBlock = ({
  withEdit = false,
  onCancel,
  onSave,
  onEdit,
  ...rest
}: InputActionsProps) => {
  const theme = useTheme();

  const [showSaveClose, setShowSaveClose] = useState(!withEdit);

  const onLocalEdit = () => {
    setShowSaveClose(true);
    onEdit?.();
  };

  const onLocalCancel = () => {
    if (withEdit) {
      setShowSaveClose(false);
    }

    onCancel();
  };

  return (
    <Stack direction="row" spacing={1} {...rest}>
      {withEdit && !showSaveClose && (
        <Button
          className="admin-form"
          onClick={onLocalEdit}
          endIcon={<Icons.Edit fill={theme.palette.colorScheme.base} />}
        >
          Edit
        </Button>
      )}

      {((withEdit && showSaveClose) || !withEdit) && (
        <>
          <Button type="submit" className="admin-form" onClick={onSave}>
            Save
          </Button>

          <Button className="admin-form" onClick={onLocalCancel}>
            Cancel
          </Button>
        </>
      )}
    </Stack>
  );
};
