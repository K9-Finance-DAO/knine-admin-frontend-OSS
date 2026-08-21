import { FormController } from 'shared/hook-form/form-controller';
import { PoolForm } from '../../shared';
import { EditFarmingPoolFormProvider } from './form-context';
import { HeaderControls, FormControls } from './components';

export const EditPoolForm = () => {
  return (
    <EditFarmingPoolFormProvider>
      <FormController>
        <HeaderControls />
        <PoolForm edit />
        <FormControls />
      </FormController>
    </EditFarmingPoolFormProvider>
  );
};
