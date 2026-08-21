import { Skeleton, Stack, Typography } from '@mui/material';
import { times } from 'lodash';
import { useAccessDataContext } from '../provider';
import { AdminRoleCard } from './adminRoleCard';

export const AdminsList = () => {
  const { adminRoles, loading } = useAccessDataContext();

  return (
    <Stack mt={4} spacing={2}>
      <Typography
        variant="body2"
        className="medium"
        sx={(theme) => ({
          pb: 3,
          borderBottom: `1px solid ${theme.palette.colorScheme.stroke}`,
        })}
      >
        Admins
      </Typography>
      {loading && (
        <Stack spacing={1}>
          {times(3).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation="wave"
              width="100%"
              height={63}
            />
          ))}
        </Stack>
      )}
      {!loading && (!adminRoles || adminRoles.length === 0) && (
        <Typography variant="h6">No admin roles</Typography>
      )}
      {!loading && adminRoles && adminRoles.length > 0 && (
        <Stack spacing={1}>
          {adminRoles.map((admin, index) =>
            Object.entries(admin).map(([address, role]) => (
              <AdminRoleCard
                key={address + role}
                role={role}
                address={address}
                index={index}
              />
            )),
          )}
        </Stack>
      )}
    </Stack>
  );
};
