import { forwardRef, useCallback, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Icons } from 'shared/components';
import { EditButtonGroupHookForm } from './button-group-hook-form';
import {
  CustomInputHookForm,
  type CustomInputHookFormProps,
} from './custom-input-hook-form';
import {
  TokenAmountInputHookForm,
  type TokenAmountInputHookFormProps,
} from './token-amount-input-hook-form';

type EditableInputGroupHookFormProps =
  | ({ inputType?: 'plain' } & CustomInputHookFormProps)
  | ({ inputType?: 'amountBn' } & TokenAmountInputHookFormProps);

export const EditableInputGroupHookForm = forwardRef<
  HTMLInputElement,
  EditableInputGroupHookFormProps
>((props, ref) => {
  const { inputType = 'plain', ...rest } = props;
  const [isEditActive, setEditActive] = useState(false);

  const InputComponent =
    inputType === 'amountBn' ? TokenAmountInputHookForm : CustomInputHookForm;

  const toggleEdit = useCallback(() => {
    setEditActive((flag) => !flag);
  }, []);

  return (
    <Box width="100%">
      <InputComponent
        disabled={!isEditActive}
        rightDecorator={
          <IconButton
            onClick={toggleEdit}
            className="transparent noPadding"
            sx={(theme) => ({
              svg: {
                fill: theme.palette.colorScheme[
                  isEditActive ? 'orangeMid' : 'base'
                ],
              },
            })}
          >
            <Icons.Edit />
          </IconButton>
        }
        {...(rest as any)}
        ref={ref}
      />
      <EditButtonGroupHookForm
        fieldName={rest.fieldName}
        hidden={!isEditActive}
        onCancel={toggleEdit}
      />
    </Box>
  );
});
