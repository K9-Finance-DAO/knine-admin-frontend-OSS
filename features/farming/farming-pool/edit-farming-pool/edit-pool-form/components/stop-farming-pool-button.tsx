import { useFormControllerContext } from 'shared/hook-form/form-controller';
import { Button } from '@mui/material';
import { useController } from 'react-hook-form';
import { useChainId } from 'shared/hooks';

export const StopFarmingPoolButton = () => {
  const { defaultChain, currentChainId } = useChainId();
  const { onSave } = useFormControllerContext();
  const { field } = useController({ name: 'emergencyStop' });

  const handleSave = () => {
    try {
      onSave?.(field);
    } catch (err) {
      console.error('handleSave', `Error saving ${field.name}`);
    }
  };

  return (
    <Button
      color="error"
      disabled={defaultChain !== currentChainId}
      onClick={handleSave}
    >
      Emergency stop
    </Button>
  );
};
