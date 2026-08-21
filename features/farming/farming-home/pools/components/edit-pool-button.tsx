import Link from 'next/link';
import { FARMING_EDIT_PATH } from 'config/urls';
import { Icons } from 'shared/components';
import { EditButton } from './styles';
import { memo } from 'react';
import { SxProps } from '@mui/material';

type Props = { id: string; sx?: SxProps };
export const EditPoolButton = memo(({ id, sx }: Props) => {
  return (
    <Link
      href={{
        pathname: FARMING_EDIT_PATH,
        query: { id },
      }}
      passHref
      style={{ marginLeft: 'auto' }}
    >
      <EditButton endIcon={<Icons.Edit />} sx={{ ...sx }}>
        Edit
      </EditButton>
    </Link>
  );
});

EditPoolButton.displayName = 'EditPoolButton';
