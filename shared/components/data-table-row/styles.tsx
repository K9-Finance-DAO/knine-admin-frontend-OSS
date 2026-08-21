import { Box, styled } from '@mui/material';
import Icons from 'shared/components/icons';

const BaseTypo = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  lineHeight: theme.typography.body1.lineHeight,

  [theme.breakpoints.down('xs')]: {
    fontSize: '12px',
    lineHeight: '16px',
  },
}));

export const RowTitleStyle = styled(BaseTypo)(({ theme }) => ({
  color: theme.palette.colorScheme.graySecondary,
  flexGrow: 1,
}));

const shouldForwardProp = (prop: string) =>
  !new Set(['$highlight', '$textColor']).has(prop);

export const RowValueStyle = styled(BaseTypo, { shouldForwardProp })<{
  $highlight?: boolean;
  $textColor?: string;
}>(({ theme, $highlight, $textColor }) => {
  let color = $textColor || theme.palette.colorScheme.light;

  if ($highlight) {
    color = theme.palette.colorScheme.greenShamrock;
  }

  return {
    marginLeft: '16px',
    textAlign: 'right',
    color: color,
    flexGrow: 0.55,
  };
});

export const HelperIcon = styled(Icons.HelperInfo)(({ theme }) => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  fill: theme.palette.colorScheme.gray,
  margin: '0 4px',
  '&:hover': {
    fill: theme.palette.colorScheme.orangeMid,
  },
}));
