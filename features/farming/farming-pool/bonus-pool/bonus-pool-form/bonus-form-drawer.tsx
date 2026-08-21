import { Drawer, Typography } from '@mui/material';
import { BonusPoolForm } from './form';
import { Icons } from 'shared/components';
import { BonusDrawerHeader, CloseButton } from './styles';
import { FormController } from 'shared/hook-form/form-controller';
import { useFormDrawer, BonusPoolFormProvider } from '../context';

export const BonusFormDrawer = () => {
  const { isOpen, closeDrawer, isEditing } = useFormDrawer();

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      PaperProps={{
        sx: { width: 470 },
      }}
      onClose={closeDrawer}
    >
      <BonusDrawerHeader>
        <Typography variant="h5" className="medium" textAlign="center">
          {isEditing ? 'Edit bonus pool' : 'Add bonus pool'}
        </Typography>

        <CloseButton onClick={closeDrawer}>
          <Icons.Close />
        </CloseButton>
      </BonusDrawerHeader>

      <BonusPoolFormProvider>
        <FormController>
          <BonusPoolForm edit={isEditing} />
        </FormController>
      </BonusPoolFormProvider>
    </Drawer>
  );
};
