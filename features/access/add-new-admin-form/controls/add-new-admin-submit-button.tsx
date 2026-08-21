import { Icons } from 'shared/components';
import { NetworkGuardedSubmitButtonHookForm } from 'shared/hook-form/controls';
import { useAccessDataContext } from '../../provider';
import { useTheme } from '@mui/material';
import { useFormState } from 'react-hook-form';

export const AddNewAdminSubmitButton = () => {
  const { currentChainId } = useAccessDataContext();
  const theme = useTheme();
  const { disabled } = useFormState();

  return (
    <NetworkGuardedSubmitButtonHookForm
      chainId={currentChainId}
      type="submit"
      disabled={disabled}
      errorField="address"
      variant="outlined"
      color="primary"
      startIcon={<Icons.Plus stroke={theme.palette.colorScheme.orangeMid} />}
      size="medium"
      sx={{ width: 177 }}
      switchBtnProps={{ sx: { width: 177 } }}
    >
      Add admin
    </NetworkGuardedSubmitButtonHookForm>
  );
};
