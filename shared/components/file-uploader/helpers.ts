// !NOTE: only types from MIME standard
// https://www.iana.org/assignments/media-types/media-types.xhtml

import { FileError, FileWithPath } from 'react-dropzone';

export const imagesTypes = {
  'image/jpeg': [],
  'image/jpg': [],
  'image/png': [],
};

export const MAX_FILE_SIZE_MB = 5;

export const allFileTypesArray = Object.keys(imagesTypes).map((key) => key);

export const checkIfFilesAreTooBig = (
  fileSize: number,
  file?: FileWithPath,
): boolean => {
  const size = (file?.size || 0) / 1024 / 1024;
  return size < fileSize;
};

export const checkIfFilesAreCorrectType = (file?: FileWithPath): boolean => {
  let innerType = file?.type;
  if (file?.type === '') {
    const splittedFilePath = file?.path?.split('.');
    innerType = splittedFilePath?.[splittedFilePath.length - 1] || '';
  }

  return allFileTypesArray.includes(innerType || '');
};

export const fileValidation = (
  file: File,
  fileSize: number,
): FileError | FileError[] | null => {
  if (!checkIfFilesAreTooBig(fileSize, file)) {
    return {
      code: 'file-size-too-large',
      message: `File size is larger than ${fileSize} MB`,
    };
  }

  if (!checkIfFilesAreCorrectType(file)) {
    return {
      code: 'wrong-file-type',
      message: `Wrong file type`,
    };
  }
  return null;
};
