import { Button, buttonClasses, styled } from '@mui/material';
import { BORDER_RADIUS_M } from 'styles';
import { Icons } from 'shared/components';

export const ButtonSelectToken = styled(Button)(({ theme }) => ({
  minWidth: 94,
  height: 40,
  borderRadius: BORDER_RADIUS_M,
  padding: theme.spacing(1, 1.5),
  color: theme.palette.colorScheme.light,
  [`&.${buttonClasses.disabled}`]: {
    color: theme.palette.colorScheme.light,
  },
}));

export const SelectChevron = styled(Icons.ChevronArrow)({
  transform: 'rotate(-90deg)',
});
