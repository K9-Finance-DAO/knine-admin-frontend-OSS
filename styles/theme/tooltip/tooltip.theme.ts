import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { BORDER_RADIUS_S } from '../constants';

export const getMuiTooltipOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiTooltip'] => ({
  tooltipPlacementBottom: {
    marginTop: `${theme.spacing(1)} !important`,
  },
  tooltipPlacementTop: {
    marginBottom: `${theme.spacing(1)} !important`,
  },
  tooltipPlacementLeft: {
    marginRight: `${theme.spacing(1)} !important`,
  },
  tooltipPlacementRight: {
    marginLeft: `${theme.spacing(1)} !important`,
  },
  tooltip: {
    background: theme.palette.colorScheme.stroke,
    borderRadius: BORDER_RADIUS_S,
    boxShadow: '0px 7px 13px 0px rgba(0, 0, 0, 0.57)',
    color: theme.palette.colorScheme.white,
    fontSize: 14,
    lineHeight: '20px',
    padding: theme.spacing(1),
  },
  arrow: {
    '&::before': {
      backgroundColor: theme.palette.colorScheme.stroke,
    },
  },
});

export const getMuiTooltipDefaultProps = (): ComponentsProps['MuiTooltip'] => ({
  arrow: true,
  enterTouchDelay: 0,
});
