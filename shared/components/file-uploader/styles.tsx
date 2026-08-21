import { Box, Button, styled } from '@mui/material';
import { BORDER_RADIUS_S, BORDER_RADIUS_XXL } from 'styles';

export const UploaderContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isBigSize' &&
    prop !== 'isPreviewActive' &&
    prop !== 'borderColor',
})<{
  isBigSize: boolean;
  isPreviewActive: boolean;
  borderColor: string;
}>(({ theme, isBigSize, isPreviewActive, borderColor }) => ({
  position: 'relative',
  flexDirection: 'column',
  padding: isBigSize ? theme.spacing(4, 3) : 0,
  width: '100%',
  height: '100%',
  borderRadius: isBigSize ? BORDER_RADIUS_XXL : 0,
  overflow: 'hidden',
  background: isBigSize
    ? theme.palette.colorScheme.darkSecondary
    : 'transparent',
  cursor: 'pointer',
  transition: '0.4s ease',
  border: isBigSize ? `2px dashed transparent` : 'none',
  borderColor: isPreviewActive && !isBigSize ? 'transparent' : borderColor,
}));

export const UploadImageButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isBigSize',
})<{
  isBigSize: boolean;
}>(({ theme, isBigSize }) => ({
  display: 'block',
  height: 28,
  color: theme.palette.colorScheme.light,
  padding: theme.spacing(0, 1.5),
  borderRadius: BORDER_RADIUS_S,
  marginTop: `${isBigSize ? '20px' : '12px'} !important`,
}));

export const PreviewContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isBigSize',
})<{
  isBigSize: boolean;
}>(({ theme, isBigSize }) => ({
  position: isBigSize ? 'absolute' : 'static',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: isBigSize ? '100%' : 44,
  height: isBigSize ? '100%' : 44,
  borderRadius: isBigSize ? 0 : '50%',
  backgroundColor: theme.palette.colorScheme.darkSecondary,
  overflow: 'hidden',
  zIndex: 1,
}));

export const PreviewDeleteButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  minWidth: 68,
  bottom: 7,
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.palette.colorScheme.light,
  height: 28,
  padding: theme.spacing(0, 1.5),
  borderRadius: BORDER_RADIUS_S,
}));
