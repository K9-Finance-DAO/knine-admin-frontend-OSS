import { Stack } from '@mui/material';
import { FormController } from 'shared/hook-form/form-controller';
import { FarmingPoolFormProvider } from './form-context';
import { BackLink, SectionHeader } from 'shared/components';
import { FARMING_PATH } from 'config/urls';
import { memo } from 'react';
import NoSSRWrapper from 'shared/components/no-ssr-wrapper';
import { ClearFormButton, SubmitFormButton } from '../shared/controls';
import { PoolForm } from '../shared/farming-pool';

const FormHeaderControls = memo(() => {
  return (
    <SectionHeader
      title="New farming pool"
      titleProps={{ variant: 'h5' }}
      titleClassName="white"
      actionsSlot={
        <>
          <ClearFormButton />
          <SubmitFormButton disableIfFormInvalid fullWidth={false} />
        </>
      }
      mb={5}
    />
  );
});

FormHeaderControls.displayName = 'FormHeaderControls';

export const CreateFarmingPool = () => {
  return (
    <Stack spacing={2} pt={2} pb={8}>
      <BackLink href={FARMING_PATH}>Back to farms</BackLink>
      <NoSSRWrapper>
        <FarmingPoolFormProvider>
          <FormController>
            <FormHeaderControls />
            <PoolForm />
          </FormController>
        </FarmingPoolFormProvider>
      </NoSSRWrapper>
    </Stack>
  );
};
