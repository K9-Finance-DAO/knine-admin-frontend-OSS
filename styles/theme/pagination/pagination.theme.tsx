import {
  ComponentsOverrides,
  ComponentsProps,
  PaginationItem,
  paginationItemClasses,
  Theme,
  touchRippleClasses,
} from '@mui/material';
import { FontWeights } from 'styles/theme/typography';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiPaginationOverrides = (
  theme: Theme,
): ComponentsOverrides['MuiPagination'] => ({
  ul: {
    '& li': {
      lineHeight: 0,
      [`& .${paginationItemClasses.root}`]: {
        fontSize: '14px',
        fontWeight: FontWeights.Medium,
        height: 26,
        minWidth: 26,
        border: `1px solid`,
        padding: theme.spacing(1.25, 1),
        borderColor: theme.palette.colorScheme.stroke,
        color: theme.palette.colorScheme.light,
        margin: theme.spacing(0.75),
      },
      [`& .${paginationItemClasses.previousNext}`]: {
        height: 26,
        width: 26,
        border: `1px solid`,
        borderColor: theme.palette.colorScheme.stroke,
        borderRadius: '4px',
        background: theme.palette.colorScheme.backgroundBase,
        [`&.${paginationItemClasses.disabled}`]: {
          opacity: 1,

          [`& .${paginationItemClasses.icon}`]: {
            fill: theme.palette.colorScheme.light,
          },
        },

        [`& .${paginationItemClasses.icon}`]: {
          fill: theme.palette.colorScheme.light,
        },
      },
      [`& .${paginationItemClasses.selected}`]: {
        color: theme.palette.colorScheme.orangeBase,
        borderColor: theme.palette.colorScheme.orangeBase,
      },
      [`& .${touchRippleClasses.root}`]: {
        display: 'none',
      },
    },
  },
});

export const getMuiPaginationDefaultProps =
  (): ComponentsProps['MuiPagination'] => ({
    shape: 'rounded',
    renderItem: (item) => <PaginationItem {...item} />,
  });
