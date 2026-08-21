import {
  ClearFormButton,
  SubmitFormButton,
} from 'features/farming/farming-pool/shared';
import { Stack } from '@mui/material';

export const FormControls = () => {
  return (
    <Stack direction="row" spacing={2} mt={3.5} paddingLeft="252px">
      <ClearFormButton text="Clear" />
      <SubmitFormButton disableIfFormInvalid sx={{ width: 126 }} />
    </Stack>
  );
};
