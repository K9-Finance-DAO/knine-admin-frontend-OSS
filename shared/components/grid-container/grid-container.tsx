import { Box, styled } from '@mui/material';

export const GridContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$columns',
})<{ $columns?: number }>(({ theme, $columns = 2 }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${$columns}, minmax(0, 1fr))`,
  padding: theme.spacing(0, 0, 3),
  gridGap: theme.spacing(3),

  [theme.breakpoints.down('md')]: {
    gridGap: theme.spacing(2),
    gridTemplateColumns: '1fr',
    padding: theme.spacing(0, 2, 3),
  },
}));
