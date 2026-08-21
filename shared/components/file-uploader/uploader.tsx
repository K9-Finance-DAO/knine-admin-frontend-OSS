import { Stack, Typography } from '@mui/material';
import {
  UploadImageButton,
  UploaderContainer,
  PreviewContainer,
  PreviewDeleteButton,
} from './styles';
import { COLOR_BASE, FontWeights } from 'styles';
import Icons from 'shared/components/icons';
import Image from 'next/image';
import { forwardRef, MouseEvent } from 'react';

export type UploaderContainerProps = {
  isBigSize: boolean;
  borderColor: string;
  filePreview: string;
  allowedFormats: string;
  maxFileSize: number;
  title?: string;
  captionText?: string;
  uploadButtonText?: string;
  onDelete: () => void;
};

export const Uploader = forwardRef(
  (
    {
      isBigSize,
      maxFileSize,
      filePreview,
      allowedFormats,
      borderColor,
      title = 'Upload Image',
      captionText,
      uploadButtonText,
      onDelete,
    }: UploaderContainerProps,
    ref,
  ) => {
    const onDeleteClick = (evt: MouseEvent<HTMLButtonElement>) => {
      evt.stopPropagation();
      onDelete();
    };

    return (
      <UploaderContainer
        isBigSize={isBigSize}
        borderColor={borderColor}
        isPreviewActive={!!filePreview}
        ref={ref}
      >
        <Stack direction={isBigSize ? 'column' : 'row'} spacing={2.5}>
          {(!!filePreview || !isBigSize) && (
            <PreviewContainer
              isBigSize={isBigSize}
              sx={{ border: `1px solid ${borderColor}` }}
            >
              {isBigSize || filePreview ? (
                <Image
                  src={filePreview}
                  width={isBigSize ? 220 : 44}
                  height={isBigSize ? 220 : 44}
                  alt="Upload preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Icons.DefaultImage fill={COLOR_BASE} />
              )}

              {!!filePreview && isBigSize && (
                <PreviewDeleteButton onClick={onDeleteClick}>
                  Delete
                </PreviewDeleteButton>
              )}
            </PreviewContainer>
          )}

          <Stack spacing={1} alignItems={isBigSize ? 'center' : 'flex-start'}>
            {isBigSize && <Icons.Upload fill={COLOR_BASE} />}

            <Typography
              variant={isBigSize ? 'body1' : 'body2'}
              className="gray-secondary"
              textAlign={isBigSize ? 'center' : 'left'}
              fontWeight={FontWeights.Medium}
              sx={{ marginTop: isBigSize ? '20px !important' : 0 }}
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />

            <Typography
              component="p"
              className="base xs"
              variant={isBigSize ? 'caption' : 'body1'}
              textAlign={isBigSize ? 'center' : 'left'}
              mt={0.5}
              dangerouslySetInnerHTML={{
                __html:
                  captionText ??
                  `${allowedFormats}, up to ${maxFileSize}&nbsp;MB.`,
              }}
            />

            {!isBigSize && !!filePreview ? (
              <UploadImageButton isBigSize={isBigSize} onClick={onDeleteClick}>
                Delete
              </UploadImageButton>
            ) : (
              <UploadImageButton isBigSize={isBigSize}>
                {uploadButtonText ?? 'Upload'}
              </UploadImageButton>
            )}
          </Stack>
        </Stack>
      </UploaderContainer>
    );
  },
);
