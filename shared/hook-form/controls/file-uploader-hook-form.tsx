import { FileUploader, FileUploaderProps } from 'shared/components';
import { Controller } from 'react-hook-form';

interface FileUploaderHookFormProps {
  fieldName: string;
}

export const FileUploaderHookForm = ({
  fieldName,
  ...uploaderProps
}: FileUploaderHookFormProps & FileUploaderProps) => {
  return (
    <Controller
      defaultValue={null}
      render={({ field: { ref, ...field }, fieldState }) => {
        const shouldDisplayPreview =
          !!field.value && typeof field.value === 'string';
        return (
          <FileUploader
            {...uploaderProps}
            {...field}
            defaultPreview={shouldDisplayPreview ? field.value : null}
            error={!!fieldState.error?.message}
          />
        );
      }}
      name={fieldName}
    />
  );
};
