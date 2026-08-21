import { Box, TextFieldProps } from '@mui/material';
import {
  CustomInputDecorator,
  CustomInputDecoratorProps,
} from './custom-input-decorator';
import { InputActionsBlock } from '..';
import { Input } from './input';
import { forwardRef, useState } from 'react';

type CustomInputProps = TextFieldProps &
  Omit<CustomInputDecoratorProps, 'onEditClick'> & {
    fieldName?: string;
    isNumeric?: boolean;
    onSubmit?: () => void;
    onCancel?: () => void;
  };

// TODO: Note! this is legacy input, in forms use EditableInputGroupHookForm!
export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      isEditable,
      isPercent,
      onCancel,
      tokenSymbol,
      customIcon,
      onSubmit,
      ...rest
    },
    ref,
  ) => {
    const [isActionsOpen, setIsActionsOpen] = useState(false);

    const handleClickEdit = () => {
      setIsActionsOpen((prev) => !prev);
    };

    const handleCancel = () => {
      onCancel?.();
      setIsActionsOpen(false);
    };

    return (
      <Box>
        <Input
          {...rest}
          rightDecorator={
            <CustomInputDecorator
              isEditable={isEditable}
              isPercent={isPercent}
              onEditClick={handleClickEdit}
              tokenSymbol={tokenSymbol}
              isEditActive={isActionsOpen}
              customIcon={customIcon}
            />
          }
          ref={ref}
        />
        {isActionsOpen && (
          <InputActionsBlock
            mt={1}
            ml={1}
            onSave={onSubmit}
            onCancel={handleCancel}
          />
        )}
      </Box>
    );
  },
);
