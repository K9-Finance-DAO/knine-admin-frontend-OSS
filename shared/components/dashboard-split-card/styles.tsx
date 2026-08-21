import { Box, Divider, GridBreakpointsType, styled } from '@mui/material';
import { defaultSpacingConfig } from './constants';

export const DividerStyled = styled(Divider, {
  shouldForwardProp: (prop) => prop !== 'spaceConfig',
})<{ spaceConfig: GridBreakpointsType }>(({ theme, spaceConfig }) => {
  const offset = spaceConfig?.xs ?? defaultSpacingConfig?.xs;
  const offsetMd = spaceConfig?.md ?? defaultSpacingConfig?.md;

  return {
    '&.MuiDivider-root': {
      position: 'absolute',
      top: theme.spacing(defaultSpacingConfig?.md),
      right: 0,
      height: `calc(100% - ${theme.spacing(offsetMd)})`,
      width: 1,
      [theme.breakpoints.down('md')]: {
        width: `calc(100% - ${theme.spacing(offset)})`,
        height: 1,
        right: '0%',
        top: `calc(100% + ${theme.spacing(offset / 2)})`,
        transform: `-translateX(${theme.spacing(offset)})`,
      },
    },
  };
});

export const Stat = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: theme.typography.h4.fontSize,
  lineHeight: theme.typography.h4.lineHeight,
  color: theme.palette.colorScheme.light,
  fontWeight: theme.typography.fontWeightRegular,
  span: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export const SlotWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2px',
  fontSize: theme.typography.caption.fontSize,
  lineHeight: '16px',
  color: theme.palette.colorScheme.gray,
}));
