import { StatusBadge } from './styles';
import { SxProps, Typography } from '@mui/material';

export type StatusType = 'active' | 'paused';

type EntityStatusBadgeProps = {
  status: StatusType;
  sx?: SxProps;
};

export const EntityStatusBadge = ({ status, sx }: EntityStatusBadgeProps) => {
  const statusText = status === 'active' ? 'Live' : 'Paused';

  return (
    <StatusBadge $variant={status} sx={sx}>
      <Typography variant="caption" className="xs medium" color="inherit">
        {statusText}
      </Typography>
    </StatusBadge>
  );
};
