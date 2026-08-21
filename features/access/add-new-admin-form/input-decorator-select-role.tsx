import { memo, useRef } from 'react';
import {
  Button,
  buttonClasses,
  Menu,
  MenuItem,
  MenuProps,
  styled,
  SxProps,
  Typography,
} from '@mui/material';

import { BORDER_RADIUS_M, COLOR_GRAY } from 'styles';
import { SelectChevron } from 'shared/components/input-amount';
import { startCase } from 'lodash';

const ButtonSelectRole = styled(Button)(({ theme }) => ({
  height: 42,
  borderRadius: BORDER_RADIUS_M,
  padding: theme.spacing(1.5),
  color: theme.palette.colorScheme.light,
  [`&.${buttonClasses.disabled}`]: {
    color: theme.palette.colorScheme.light,
  },
}));

export type RoleOption = {
  label: string;
  value: string;
};

export interface InputDecoratorSelectRoleProps extends MenuProps {
  currentOption: RoleOption;
  options: RoleOption[];
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onSelectRole: (value: RoleOption) => void;
}

export const InputDecoratorSelectRole = memo(
  ({
    currentOption,
    options,
    onOpenMenu,
    onSelectRole,
    onCloseMenu,
    open,
    btnSx,
    ...rest
  }: InputDecoratorSelectRoleProps & { btnSx?: SxProps }) => {
    const menuRef = useRef(null);

    const handleSelect = (option: RoleOption) => {
      onSelectRole(option);
      onCloseMenu();
    };

    return (
      <>
        <ButtonSelectRole
          variant="contained"
          onClick={onOpenMenu}
          ref={menuRef}
          endIcon={<SelectChevron fill={COLOR_GRAY} />}
          sx={btnSx}
        >
          {startCase(currentOption.label.toLowerCase())}
        </ButtonSelectRole>

        <Menu
          open={open}
          onClose={onCloseMenu}
          anchorEl={menuRef.current}
          {...rest}
          slotProps={{ paper: { sx: { maxWidth: 230 } } }}
          sx={{
            ...rest?.sx,
          }}
        >
          {options.map((option) => (
            <MenuItem
              value={option.value}
              key={option.label}
              onClick={() => handleSelect(option)}
            >
              <Typography marginLeft={1}>{option.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  },
);

InputDecoratorSelectRole.displayName = 'InputDecoratorSelectRole';
