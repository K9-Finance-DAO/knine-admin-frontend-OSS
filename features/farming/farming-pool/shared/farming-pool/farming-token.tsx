import { ReactNode } from 'react';
import { SectionHeader } from 'shared/components';
import { FarmingPoolFormFields } from '../types';
import { CustomInputHookForm } from 'shared/hook-form/controls';
import { Stack } from '@mui/material';
import { FileUploaderHookForm } from 'shared/hook-form/controls/file-uploader-hook-form';

export type FarmingPoolFormFieldsKeys = keyof FarmingPoolFormFields;

type FarmingFormTokenProps = {
  title: string;
  edit?: boolean;
  appendInputs?: ReactNode;
  fieldName: Extract<
    FarmingPoolFormFieldsKeys,
    'token0' | 'token1' | 'tokenReward'
  >;
};

export const FarmingToken = ({
  title,
  fieldName,
  appendInputs,
  edit,
}: FarmingFormTokenProps) => {
  return (
    <Stack spacing={2}>
      <SectionHeader title={title} titleClassName="gray-secondary" />
      <FileUploaderHookForm fieldName={`${fieldName}.logo`} />

      <CustomInputHookForm
        label="Address token"
        disabled={edit}
        fieldName={`${fieldName}.address`}
        placeholder="0x76F2a66D8Af418113725e3bAc20BFCb4F92d63b5"
      />

      {appendInputs}
    </Stack>
  );
};
