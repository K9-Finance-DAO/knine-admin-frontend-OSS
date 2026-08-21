import { memo, useRef } from 'react';
import { Menu, MenuItem, MenuProps, SxProps, Typography } from '@mui/material';

import Image from 'next/image';
import { ButtonSelectToken, SelectChevron } from './styled';
import { iconsMap, TOKENS } from './config';

export type CurrencyOption = {
  name: TOKENS;
};

export interface InputDecoratorSelectTokenProps extends MenuProps {
  currentOption: CurrencyOption;
  options: CurrencyOption[];
  onOpenMenu: () => void;
  onSelectCurrency: (value: CurrencyOption) => void;
}

export const InputDecoratorSelectToken = memo(
  ({
    currentOption,
    options,
    onOpenMenu,
    onSelectCurrency,
    onClose,
    open,
    btnSx,
    ...rest
  }: InputDecoratorSelectTokenProps & { btnSx?: SxProps }) => {
    const menuRef = useRef(null);
    const isSingleToken = options.length === 1;

    return (
      <>
        <ButtonSelectToken
          variant="contained"
          onClick={onOpenMenu}
          ref={menuRef}
          disabled={isSingleToken}
          startIcon={
            <Image
              src={iconsMap[currentOption.name]}
              width={24}
              height={24}
              alt="kn"
            />
          }
          endIcon={!isSingleToken ? <SelectChevron /> : null}
          sx={btnSx}
        >
          {currentOption.name}
        </ButtonSelectToken>

        {!isSingleToken && (
          <Menu
            open={open}
            onClose={onClose}
            anchorEl={menuRef.current}
            {...rest}
            slotProps={{ paper: { sx: { width: 140 } } }}
            sx={{
              ...rest?.sx,
            }}
          >
            {options.map(({ name }) => (
              <MenuItem
                value={name}
                key={name}
                onClick={() => onSelectCurrency({ name })}
              >
                <Image
                  src={iconsMap[name]}
                  alt={name}
                  width={24}
                  height={24}
                  sizes="72w"
                  quality={100}
                />
                <Typography marginLeft={1}>{name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        )}
      </>
    );
  },
);

InputDecoratorSelectToken.displayName = 'InputDecoratorSelectToken';
