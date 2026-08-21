import { Theme } from '@mui/material';
import { FontWeights } from '../typography';

export const getMuiPickersDayOverrides = (theme: Theme) => ({
  root: {
    background: 'transparent',
    border: '1px solid transparent',
    transition: theme.transitions.create('border-color', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    '&.MuiPickersDay-root': {
      ...theme.typography.body2,
      fontWeight: FontWeights.Medium,
      color: theme.palette.colorScheme.light,

      '&:hover': {
        borderColor: theme.palette.colorScheme.orangeMid,
      },
    },

    '&.MuiPickersDay-today': {
      borderColor: theme.palette.colorScheme.orangeMid,
    },

    '&.Mui-disabled': {
      color: `${theme.palette.colorScheme.gray} !important`,
    },

    '&.Mui-selected': {
      background: `${theme.palette.colorScheme.orangeMid} !important`,
      color: theme.palette.colorScheme.darkSecondary,
    },

    '&:not(.Mui-selected)': {
      background: 'transparent',
    },
  },
});

export const getMuiPrivatePickersYearOverrides = (theme: Theme) => ({
  root: {
    button: {
      ...theme.typography.body2,
      background: 'transparent',
      color: theme.palette.colorScheme.black,

      '&.Mui-selected': {
        background: `${theme.palette.colorScheme.orangeMid} !important`,
      },
    },
  },
});

export const getMuiPickersCalendarHeaderOverrides = (theme: Theme) => ({
  root: {
    label: {
      ...theme.typography.body2,
      color: theme.palette.colorScheme.light,
    },

    '& .MuiPickersCalendarHeader-switchViewButton': {
      background: 'transparent',
    },

    '& .MuiPickersArrowSwitcher-button': {
      margin: 0,
      background: 'transparent',

      '& .Mui-disabled': {
        background: 'transparent',
      },
    },
  },
});

export const getMuiPickersDayCalendarOverrides = (theme: Theme) => ({
  root: {
    '& .MuiDayCalendar-weekDayLabel': {
      fontWeight: FontWeights.Medium,
      color: theme.palette.colorScheme.base,
    },
  },
});

export const getMuiYearCalendarOverrides = (theme: Theme) => ({
  root: {
    '& .MuiPickersYear-root ': {
      '& .MuiPickersYear-yearButton': {
        fontSize: 14,
        textAlign: 'center',
        border: '1px solid transparent',
        transition: theme.transitions.create('border-color', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),

        '&.Mui-selected': {
          backgroundColor: theme.palette.colorScheme.orangeMid,

          '&:hover': {
            background: theme.palette.colorScheme.orangeMid,
          },
        },

        '&:hover:not(.Mui-selected)': {
          backgroundColor: 'transparent',
          borderColor: theme.palette.colorScheme.orangeMid,
        },
      },
    },
  },
});

export const getMuiDatePickerOverrides = (theme: Theme) => ({
  root: {
    '& .MuiPaper-root': {
      background: theme.palette.colorScheme.darkSecondary,
      borderRadius: '16px',
    },
  },
});

export const getMuiDatePickerDigitalClockOverrides = (theme: Theme) => ({
  root: {
    '& .MuiMultiSectionDigitalClockSection-root': {
      width: 60,
    },

    '& .MuiMenuItem-root': {
      border: '1px solid transparent',
      transition: theme.transitions.create('border-color', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),

      '&.Mui-selected': {
        background: theme.palette.colorScheme.orangeMid,

        '&:hover': {
          background: theme.palette.colorScheme.orangeMid,
        },
      },

      '&:hover:not(.Mui-selected)': {
        background: 'transparent',
        borderColor: theme.palette.colorScheme.orangeMid,
      },
    },
  },
});
