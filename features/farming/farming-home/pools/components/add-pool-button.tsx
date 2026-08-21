import Link from 'next/link';
import { FARMING_CREATE_PATH } from 'config/urls';
import { Icons } from 'shared/components';
import { COLOR_ORANGE_MID } from 'styles';
import { Button } from '@mui/material';
import { useChainId } from 'shared/hooks';

export const AddPoolButton = () => {
  const { defaultChain, currentChainId } = useChainId();

  return (
    <Button
      component={Link}
      href={FARMING_CREATE_PATH}
      variant="outlined"
      disabled={defaultChain !== currentChainId}
      startIcon={<Icons.Plus stroke={COLOR_ORANGE_MID} />}
      size="medium"
      sx={{ width: 177 }}
    >
      Add Farm Pool
    </Button>
  );
};
