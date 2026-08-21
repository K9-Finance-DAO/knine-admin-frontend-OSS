import { Button, Stack, Typography } from '@mui/material';
import { Icons } from 'shared/components';
import { BonusFormDrawer } from './bonus-pool-form/bonus-form-drawer';
import { COLOR_ORANGE_MID } from 'styles';
import { BonusPoolsList } from './bonus-pools-list';
import {
  FormDrawerProvider,
  useBonusPoolsData,
  useFormDrawer,
} from './context';
import { BonusPoolsProvider } from './context';

const AddPoolButton = () => {
  const { openCreateForm } = useFormDrawer();
  const { isAddBonusPoolDisabled, initialLoading } = useBonusPoolsData();

  return (
    <Button
      variant="outlined"
      disabled={initialLoading || isAddBonusPoolDisabled}
      startIcon={<Icons.Plus stroke={COLOR_ORANGE_MID} />}
      size="medium"
      onClick={openCreateForm}
      sx={{ width: 177 }}
    >
      Add bonus pool
    </Button>
  );
};

export const BonusPool = () => {
  return (
    <FormDrawerProvider>
      <BonusPoolsProvider>
        <Stack pt={3}>
          <Typography variant="h5" className="white" mb={4}>
            Edit farming pool
          </Typography>
          <AddPoolButton />
          <BonusPoolsList />
          <BonusFormDrawer />
        </Stack>
      </BonusPoolsProvider>
    </FormDrawerProvider>
  );
};
