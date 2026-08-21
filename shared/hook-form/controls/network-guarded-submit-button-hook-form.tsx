import { ComponentProps } from 'react';
import { SubmitButtonHookForm } from 'shared/hook-form/controls/submit-button-hook-form';
import { SwitchNetworkArgs } from 'shared/wallet';
import { SwitchNetworkButtonGuard } from 'shared/components';
import { ButtonProps } from '@mui/material';

type NetworkGuardedSubmitButtonHookFormProps = {
  switchBtnProps?: ButtonProps;
} & SwitchNetworkArgs &
  ComponentProps<typeof SubmitButtonHookForm>;

export const NetworkGuardedSubmitButtonHookForm = ({
  chainId,
  onError,
  onSuccess,
  switchBtnProps,
  ...props
}: NetworkGuardedSubmitButtonHookFormProps) => {
  return (
    <SwitchNetworkButtonGuard
      chainId={chainId}
      onSuccess={onSuccess}
      {...switchBtnProps}
      onError={onError}
    >
      <SubmitButtonHookForm {...props} />
    </SwitchNetworkButtonGuard>
  );
};
