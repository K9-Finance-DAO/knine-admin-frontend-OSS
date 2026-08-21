import { BonusPoolFormSocials, BonusPoolFormInfo } from './form-parts';
import { Stack } from '@mui/material';
import { FormControlGroupButtons } from 'shared/components';
import {
  ClearFormButton,
  SubmitFormButton,
} from 'features/farming/farming-pool/shared';
import { FileUploaderHookForm } from 'shared/hook-form/controls';
import { FormTitle } from './form-parts';
import { useFormDrawer } from 'features/farming/farming-pool/bonus-pool/context';

export const BonusPoolForm = ({ edit }: { edit: boolean }) => {
  const { closeDrawer } = useFormDrawer();

  return (
    <Stack spacing={3}>
      <FormTitle>Logo</FormTitle>
      <FileUploaderHookForm fieldName="poolLogo" />
      <BonusPoolFormInfo edit={edit} />
      <BonusPoolFormSocials />

      <FormControlGroupButtons
        sx={{ marginTop: `12px !important`, button: { flex: 1 } }}
      >
        <SubmitFormButton />
        <ClearFormButton text="Cancel" iconSlot={null} onClick={closeDrawer} />
      </FormControlGroupButtons>
    </Stack>
  );
};
