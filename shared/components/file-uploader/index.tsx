import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { Box, SxProps, Theme } from '@mui/material';
import { COLOR_BASE, COLOR_RED_DARK, COLOR_STROKE } from 'styles';
import { showToastMessage } from 'utils';

import { Uploader } from './uploader';
import { fileValidation, imagesTypes, MAX_FILE_SIZE_MB } from './helpers';

export interface FileUploaderProps {
  size?: 'big' | 'default';
  maxFileSize?: number;
  defaultPreview?: string | File | null;
  acceptFiles?: Accept;
  error?: boolean;
  title?: string;
  captionText?: string;
  uploadButtonText?: string;
  sx?: SxProps<Theme>;
  onChange?: (file: File | null) => void;
}

export interface FileUploaderHandlers {
  open: () => void;
  clearPreview: () => void;
}

export const FileUploader = forwardRef<FileUploaderHandlers, FileUploaderProps>(
  (
    {
      defaultPreview,
      sx,
      onChange,
      error = false,
      size = 'default',
      acceptFiles = imagesTypes,
      maxFileSize = MAX_FILE_SIZE_MB,
      title,
      captionText,
      uploadButtonText,
    },
    ref,
  ) => {
    const [filePreview, setFilePreview] = useState('');
    const [filePreviewName, setFilePreviewName] = useState('');

    const clearPreview = useCallback(() => {
      setFilePreview('');
      setFilePreviewName('');
      if (onChange) {
        onChange(null);
      }
    }, [onChange]);

    const onDrop = (
      acceptedFiles: File[],
      FileRejections: Array<FileRejection>,
    ) => {
      if (acceptedFiles.length === 0) {
        showToastMessage('error', FileRejections[0].errors[0].message);
        return;
      }
      const [currentFile] = acceptedFiles;

      if (onChange) {
        onChange(currentFile);
      }

      const preview = URL.createObjectURL(currentFile);
      setFilePreview(preview);
      setFilePreviewName(currentFile.name);
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop,
      accept: acceptFiles,
      validator: (file) => fileValidation(file, maxFileSize),
    });

    useImperativeHandle(ref, () => ({ open, clearPreview }), [
      open,
      clearPreview,
    ]);

    useEffect(() => {
      if (defaultPreview) {
        setFilePreview(defaultPreview as string);
      }
    }, [defaultPreview]);

    const borderColor = useMemo(() => {
      if (isDragActive) return COLOR_BASE;
      if (error) return COLOR_RED_DARK;
      return COLOR_STROKE;
    }, [isDragActive, error]);

    const isBigSize = size === 'big';

    const allowedFormats = useMemo(() => {
      if (acceptFiles) {
        return Object.keys(acceptFiles)
          .map((file) =>
            file.substring(file.lastIndexOf('/') + 1).toUpperCase(),
          )
          .join(', ');
      }
      return `PNG, GIF, JPEG, SVG`;
    }, [acceptFiles]);

    return (
      <Box
        sx={{
          width: isBigSize ? 220 : 'fit-content',
          height: isBigSize ? 220 : 'fit-content',
          ...sx,
        }}
        {...getRootProps()}
      >
        <Box component="input" {...getInputProps()} />

        <Uploader
          allowedFormats={allowedFormats}
          filePreview={filePreview}
          borderColor={borderColor}
          maxFileSize={maxFileSize}
          isBigSize={isBigSize}
          title={filePreviewName || title}
          captionText={captionText}
          uploadButtonText={uploadButtonText}
          onDelete={() => clearPreview()}
        />
      </Box>
    );
  },
);
