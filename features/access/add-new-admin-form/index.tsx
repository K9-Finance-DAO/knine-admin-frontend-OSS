import { styled, Typography } from '@mui/material';
import { BorderedBox } from 'shared/components';
import { useState } from 'react';
import { Fallback } from 'shared/wallet';
import { useAccessDataContext } from '../provider';
import { FormController } from 'shared/hook-form/form-controller';
import { AddNewAdminInput } from './controls/add-new-admin-input';
import { AddNewAdminSubmitButton } from './controls/add-new-admin-submit-button';

const FormControllerStyled = styled(FormController)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(2),
}));

export const AddNewAdminForm = () => {
  const { currentChainId } = useAccessDataContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Fallback forcedChainId={currentChainId} />
      <BorderedBox mt={4} p={3} spacing={2}>
        <Typography
          variant="body2"
          color={(theme) => theme.palette.colorScheme.gray}
        >
          New Admin Address
        </Typography>
        <FormControllerStyled>
          <AddNewAdminInput
            onOpenMenu={() => setIsMenuOpen(true)}
            onCloseMenu={() => setIsMenuOpen(false)}
            open={isMenuOpen}
          />
          <AddNewAdminSubmitButton />
        </FormControllerStyled>
      </BorderedBox>
    </>
  );
};
