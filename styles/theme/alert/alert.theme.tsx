import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import {
  BORDER_RADIUS_L,
  BORDER_RADIUS_XL,
  COLOR_BASE,
  COLOR_ORANGE_BASE,
} from 'styles/theme/constants';
import Icons from 'shared/components/icons';

export const getMuiAlertOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiAlert'] => {
  const filledInfo = {
    padding: theme.spacing(3),
    background: theme.palette.colorScheme.stroke,
    color: theme.palette.colorScheme.graySecondary,
    borderRadius: BORDER_RADIUS_L,

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  };

  return {
    root: {
      '&.padding-thin': {
        padding: theme.spacing(2),
      },
    },
    filled: {
      padding: theme.spacing(2),

      '&.radius-l': {
        borderRadius: BORDER_RADIUS_L,
      },
    },
    filledWarning: {
      padding: theme.spacing(3),
      background: theme.palette.colorScheme.blackout,
      borderColor: theme.palette.colorScheme.orangeMid,
      border: '1px solid',
      color: theme.palette.colorScheme.orangeMid,
      borderRadius: BORDER_RADIUS_XL,

      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
      },
    },
    filledInfo: {
      ...filledInfo,
    },
    filledError: {
      ...filledInfo,
      svg: {
        color: theme.palette.colorScheme.orangeBase,
      },
    },
    message: {
      padding: 0,
      lineHeight: '20px',
      fontSize: '14px',
    },
    icon: {
      padding: 0,
      marginRight: '10px',
    },
  };
};

export const getMuiAlertDefaultProps = (): ComponentsProps['MuiAlert'] => ({
  iconMapping: {
    info: <Icons.Info fill={COLOR_BASE} />,
    warning: <Icons.Warning fill={COLOR_ORANGE_BASE} />,
    error: <Icons.Warning fill={COLOR_ORANGE_BASE} />,
  },
});
