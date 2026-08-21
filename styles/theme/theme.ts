import { createTheme } from '@mui/material/styles';
import {
  breakpointOptions,
  getMuiGridDefaultProps,
  getMuiGridOverrides,
} from './grid';
import { getTypographyOptions } from './typography';
import {
  getMuiCssBaselineDefaultProps,
  getMuiCssBaselineOverrides,
} from './css-baseline';
import {
  getMuiButtonDefaultProps,
  getMuiButtonOverrides,
  getMuiIconButtonDefaultProps,
  getMuiIconButtonOverrides,
} from './button';
import {
  getMuiContainerDefaultProps,
  getMuiContainerOverrides,
} from './container';
import { getMuiDividerOverrides } from './divider';
import { getMuiCheckbox, getMuiCheckboxDefaultProps } from './checkbox';
import {
  getMuiAccordion,
  getMuiAccordionDetails,
  getMuiAccordionPropsDefaultProps,
  getMuiAccordionSummary,
} from './accordion';
import { getMuiAlertDefaultProps, getMuiAlertOverrides } from './alert';
import {
  getMuiFilledInputDefaultProps,
  getMuiFilledInputOverrides,
  getMuiTextFieldDefaultProps,
  getMuiTextFieldOverrides,
} from './textfield';
import {
  getMuiMenuItemDefaultProps,
  getMuiMenuItemOverrides,
  getMuiMenuOverrides,
} from './menu';
import { getMuiDrawerDefaultProps, getMuiDrawerOverrides } from './drawer';
import {
  getMuiTabDefaultProps,
  getMuiTabOverrides,
  getMuiTabsDefaultProps,
  getMuiTabsOverrides,
} from './tabs';
import { getMuiTooltipDefaultProps, getMuiTooltipOverrides } from './tooltip';
import { getMuiDialogOverrides } from './dialog';
import { colorsMap } from './constants';
import { getMuiLinkDefaultProps, getMuiLinkOverrides } from './link';
import {
  getMuiPaginationDefaultProps,
  getMuiPaginationOverrides,
} from './pagination';
import {
  getMuiToggleButtonDefaultProps,
  getMuiToggleButtonGroupDefaultProps,
  getMuiToggleButtonGroupOverrides,
  getMuiToggleButtonOverrides,
} from './toggle-button/toggle-button-theme';
import { getMuiChipOverrides } from './chip';
import {
  getMuiDatePickerOverrides,
  getMuiPickersCalendarHeaderOverrides,
  getMuiPickersDayCalendarOverrides,
  getMuiPickersDayOverrides,
  getMuiYearCalendarOverrides,
  getMuiDatePickerDigitalClockOverrides,
} from './datepicker';

const themeBase = createTheme({
  breakpoints: breakpointOptions,
  typography: getTypographyOptions(),
  palette: {
    colorScheme: colorsMap,
  },
});

export const theme = createTheme(themeBase, {
  components: {
    MuiCssBaseline: {
      defaultProps: getMuiCssBaselineDefaultProps(),
      styleOverrides: getMuiCssBaselineOverrides(themeBase),
    },
    MuiContainer: {
      defaultProps: getMuiContainerDefaultProps(),
      styleOverrides: getMuiContainerOverrides(themeBase),
    },
    MuiButton: {
      defaultProps: getMuiButtonDefaultProps(),
      styleOverrides: getMuiButtonOverrides(themeBase),
    },
    MuiIconButton: {
      defaultProps: getMuiIconButtonDefaultProps(),
      styleOverrides: getMuiIconButtonOverrides(themeBase),
    },
    MuiGrid: {
      defaultProps: getMuiGridDefaultProps(),
      styleOverrides: getMuiGridOverrides(),
    },
    MuiDivider: {
      styleOverrides: getMuiDividerOverrides(themeBase),
    },
    MuiCheckbox: {
      defaultProps: getMuiCheckboxDefaultProps(),
      styleOverrides: getMuiCheckbox(themeBase),
    },
    MuiAccordion: {
      defaultProps: getMuiAccordionPropsDefaultProps(),
      styleOverrides: getMuiAccordion(themeBase),
    },
    MuiAccordionDetails: {
      styleOverrides: getMuiAccordionDetails(themeBase),
    },
    MuiAccordionSummary: {
      styleOverrides: getMuiAccordionSummary(themeBase),
    },
    MuiAlert: {
      defaultProps: getMuiAlertDefaultProps(),
      styleOverrides: getMuiAlertOverrides(themeBase),
    },
    MuiTextField: {
      defaultProps: getMuiTextFieldDefaultProps(),
      styleOverrides: getMuiTextFieldOverrides(themeBase),
    },
    MuiFilledInput: {
      defaultProps: getMuiFilledInputDefaultProps(),
      styleOverrides: getMuiFilledInputOverrides(themeBase),
    },
    MuiMenu: {
      styleOverrides: getMuiMenuOverrides(themeBase),
    },
    MuiMenuItem: {
      styleOverrides: getMuiMenuItemOverrides(themeBase),
      defaultProps: getMuiMenuItemDefaultProps(),
    },
    MuiDrawer: {
      styleOverrides: getMuiDrawerOverrides(themeBase),
      defaultProps: getMuiDrawerDefaultProps(),
    },
    MuiTabs: {
      styleOverrides: getMuiTabsOverrides(themeBase),
      defaultProps: getMuiTabsDefaultProps(),
    },
    MuiTab: {
      styleOverrides: getMuiTabOverrides(themeBase),
      defaultProps: getMuiTabDefaultProps(),
    },
    MuiTooltip: {
      styleOverrides: getMuiTooltipOverrides(themeBase),
      defaultProps: getMuiTooltipDefaultProps(),
    },
    MuiDialog: {
      styleOverrides: getMuiDialogOverrides(themeBase),
    },
    MuiLink: {
      defaultProps: getMuiLinkDefaultProps(),
      styleOverrides: getMuiLinkOverrides(themeBase),
    },
    MuiPagination: {
      defaultProps: getMuiPaginationDefaultProps(),
      styleOverrides: getMuiPaginationOverrides(themeBase),
    },
    MuiToggleButtonGroup: {
      styleOverrides: getMuiToggleButtonGroupOverrides(themeBase),
      defaultProps: getMuiToggleButtonGroupDefaultProps(),
    },
    MuiToggleButton: {
      styleOverrides: getMuiToggleButtonOverrides(themeBase),
      defaultProps: getMuiToggleButtonDefaultProps(),
    },
    MuiChip: {
      styleOverrides: getMuiChipOverrides(themeBase),
    },
    MuiPickersPopper: {
      styleOverrides: getMuiDatePickerOverrides(themeBase),
    },
    MuiPickersDay: {
      styleOverrides: getMuiPickersDayOverrides(themeBase),
    },
    MuiDayCalendar: {
      styleOverrides: getMuiPickersDayCalendarOverrides(themeBase),
    },
    MuiPickersCalendarHeader: {
      styleOverrides: getMuiPickersCalendarHeaderOverrides(themeBase),
    },
    MuiYearCalendar: {
      styleOverrides: getMuiYearCalendarOverrides(themeBase),
    },
    MuiMultiSectionDigitalClock: {
      styleOverrides: getMuiDatePickerDigitalClockOverrides(themeBase),
    },
  },
});
