/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  accordionClasses,
  ComponentsOverrides,
  ComponentsProps,
  Theme,
} from '@mui/material';
import { BORDER_RADIUS_M, COLOR_LIGHT } from 'styles/theme/constants';

const sharedProps = {
  color: COLOR_LIGHT,
  boxShadow: 'none',
};

export const getMuiAccordion = (
  theme: Theme,
): ComponentsOverrides['MuiAccordion'] => ({
  root: {
    maxWidth: 594,
    background: 'transparent',
    backgroundColor: theme.palette.colorScheme.backgroundBase,
    border: '1.5px solid',
    borderColor: theme.palette.colorScheme.stroke,
    borderRadius: BORDER_RADIUS_M,
    ...sharedProps,
    overflow: 'hidden',

    '&:before': {
      content: 'none',
    },

    '&:hover': {
      borderColor: theme.palette.colorScheme.base,
    },

    [`& .${accordionClasses.expanded}`]: {
      borderRadius: '12px 12px 0 0',
      overflow: 'hidden',
      transition: 'none !important',
      background: theme.palette.colorScheme.stroke,
      border: 'none',
      ...sharedProps,
    },
  },
});

export const getMuiAccordionSummary = (
  theme: Theme,
): ComponentsOverrides['MuiAccordionSummary'] => ({
  root: {
    minHeight: 0,
    padding: `${theme.spacing(1.75)} !important`,
    overflow: 'hidden',

    '&.fat': {
      padding: `${theme.spacing(2)} !important`,
    },
  },
  content: {
    margin: 0,
  },
});

export const getMuiAccordionDetails = (
  theme: Theme,
): ComponentsOverrides['MuiAccordionDetails'] => ({
  root: {
    padding: `${theme.spacing(0, 1.75, 1.75)} !important`,
    background: theme.palette.colorScheme.stroke,
    borderRadius: '0 0 12px 12px',
    border: 'none',
    overflow: 'hidden',

    '&.fat': {
      padding: `${theme.spacing(0, 2, 2, 2)} !important`,
    },

    '&.noPadding': {
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
    },
  },
});

export const getMuiAccordionPropsDefaultProps =
  (): ComponentsProps['MuiAccordion'] => ({
    disableGutters: true,
    elevation: 0,
    square: true,
  });
