import {
  SubmitButtonHookForm,
  SubmitButtonHookFormProps,
} from 'shared/hook-form/controls';
import { useChainId } from 'shared/hooks';

export const SubmitFormButton = (
  props: Omit<SubmitButtonHookFormProps, 'onError'>,
) => {
  const { defaultChain, currentChainId } = useChainId();
  return (
    <SubmitButtonHookForm disabled={defaultChain !== currentChainId} {...props}>
      Save
    </SubmitButtonHookForm>
  );
};
