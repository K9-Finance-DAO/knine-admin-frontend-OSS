import { Button } from '@mui/material';
import {
  useEmergencyStop,
  useVestingContractValues,
} from 'features/vesting/hooks';

export const EmergencyStop = () => {
  const stop = useEmergencyStop();
  const { data } = useVestingContractValues();

  return (
    <Button
      onClick={stop}
      disabled={!data?.endTime?.isZero()}
      color="error"
      size="medium"
      sx={{ minWidth: 162 }}
    >
      Emergency Stop
    </Button>
  );
};
