import { SxProps, ToggleButtonGroup, Typography } from '@mui/material';
import { useState, MouseEvent, ReactNode, PropsWithChildren } from 'react';
import { BorderedBox } from '../bordered-box';
import { ToggleStatusButton } from 'shared/components/status-toggle-box/styles';
import { useSDK } from '@knine-sdk/react';
import { CHAINS } from '@knine-sdk/constants';

export type Status = 'active' | 'inactive';

type StatusToggleBoxProps = {
  title: ReactNode;
  chainId: CHAINS;
  status: Status;
  onSwitch: () => Promise<boolean>;
  loading?: boolean;
  booleanStatus?: boolean;
  sx?: SxProps;
};

export const StatusToggleBox = ({
  children,
  title,
  onSwitch,
  chainId,
  status,
  loading,
  booleanStatus,
  sx,
}: StatusToggleBoxProps & PropsWithChildren) => {
  const { chainId: currentChainId } = useSDK();
  const [currentStatus, setCurrentStatus] = useState<Status>(status);

  const isSwitchAvailable = chainId === currentChainId;

  const handleToggleStatus = async (
    e: MouseEvent<HTMLElement>,
    value: Status | null,
  ) => {
    const isSuccess = await onSwitch();

    if (isSuccess && value) {
      setCurrentStatus(value);
    }
  };

  const titleComponent =
    typeof title === 'string' ? (
      <Typography variant="body2" className="medium">
        {title}
      </Typography>
    ) : (
      title
    );

  return (
    <BorderedBox
      sx={{
        padding: 2,
        paddingTop: 1,
        ...sx,
      }}
      spacing={1.5}
    >
      {titleComponent}
      <ToggleButtonGroup
        value={currentStatus}
        exclusive
        disabled={!isSwitchAvailable}
        onChange={handleToggleStatus}
      >
        <ToggleStatusButton value="active" $loading={loading}>
          {booleanStatus ? 'True' : 'Live'}
        </ToggleStatusButton>
        <ToggleStatusButton
          value="inactive"
          $loading={loading}
          className="danger"
        >
          {booleanStatus ? 'False' : 'Paused'}
        </ToggleStatusButton>
      </ToggleButtonGroup>
      {children}
    </BorderedBox>
  );
};
