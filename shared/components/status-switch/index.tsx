import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { BorderedBox } from '../bordered-box';

export type ContractStatus = 'Live' | 'Paused' | undefined;

type StatusSwitchProps = {
  title: string;
  status?: ContractStatus;
  onSwitch?: () => Promise<void>;
  loading?: boolean;
  inactiveStatusText?: string;
  booleanStatus?: boolean;
};

export const StatusSwitch = ({
  title,
  status,
  onSwitch,
  loading,
  inactiveStatusText = 'Paused',
  booleanStatus = false,
}: StatusSwitchProps) => {
  const [currentStatus, setCurrentStatus] = useState<ContractStatus>(status);

  const handleToggleStatus = useCallback(
    async (e: React.MouseEvent<HTMLElement>, value: string | null) => {
      setCurrentStatus((prev) => (value as ContractStatus) || prev);
      await onSwitch?.();
    },
    [onSwitch],
  );

  useEffect(() => {
    if (!currentStatus && status) {
      setCurrentStatus(status);
    }
  }, [currentStatus, status]);

  const toggleButtonTrueText = booleanStatus ? 'True' : 'Live';
  const toggleButtonFalseText = booleanStatus ? 'False' : inactiveStatusText;

  return (
    <BorderedBox
      sx={(theme) => ({ padding: theme.spacing(1, 2, 2) })}
      spacing={1.5}
    >
      <Typography variant="body2" className="medium">
        {title}
      </Typography>

      <ToggleButtonGroup
        value={currentStatus}
        exclusive
        onChange={handleToggleStatus}
        disabled={!onSwitch || loading}
      >
        <ToggleButton value="Live">{toggleButtonTrueText}</ToggleButton>
        <ToggleButton value="Paused">{toggleButtonFalseText}</ToggleButton>
      </ToggleButtonGroup>
    </BorderedBox>
  );
};
