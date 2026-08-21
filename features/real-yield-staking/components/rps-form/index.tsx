import { FormController } from 'shared/hook-form/form-controller';
import { RewardPerSecondFormDataProvider } from './form-context';
import { RewardPerSecondInput } from './controls';

export const RewardPerSecondForm = () => {
  return (
    <RewardPerSecondFormDataProvider>
      <FormController>
        <RewardPerSecondInput />
      </FormController>
    </RewardPerSecondFormDataProvider>
  );
};
