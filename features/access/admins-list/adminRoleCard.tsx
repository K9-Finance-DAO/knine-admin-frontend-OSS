import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { BORDER_RADIUS_S } from 'styles';
import { startCase } from 'lodash';
import { BorderedBox, Icons } from 'shared/components';
import { useRevokeRole } from '../hooks';
import { useAccessDataContext } from '../provider';

type Props = {
  address: string;
  role: string;
  index: number;
};

export const AdminRoleCard = ({ address, role, index }: Props) => {
  const { contractAddress, isDefaultAdmin, contractAdminRoles } =
    useAccessDataContext();
  const revokeRole = useRevokeRole(contractAddress);

  const handleRevokeRole = async () => {
    if (contractAdminRoles) {
      const roleBytesLike = contractAdminRoles[role];
      await revokeRole(roleBytesLike, address);
    }
  };

  return (
    <BorderedBox
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid container item xs={12} alignItems="center">
        <Grid item xs={4.5}>
          <Typography variant="body2">
            {index + 1}.&nbsp;&nbsp;
            {address}
          </Typography>
        </Grid>
        <Grid item xs={6.5}>
          <Typography
            className="medium"
            p={(theme) => theme.spacing(0.5, 1)}
            bgcolor={(theme) => theme.palette.colorScheme.stroke}
            borderRadius={BORDER_RADIUS_S}
            width="fit-content"
          >
            {startCase(role.toLowerCase())}
          </Typography>
        </Grid>
        <Grid item xs={1} display="flex" justifyContent="flex-end">
          <Tooltip
            title={
              !isDefaultAdmin &&
              'You don`t have access to revoke role on this contract'
            }
          >
            <Box>
              <IconButton
                className="transparent"
                disabled={!isDefaultAdmin}
                onClick={handleRevokeRole}
                sx={(theme) => ({
                  svg: { fill: theme.palette.colorScheme.base },
                  ...(isDefaultAdmin && {
                    '&:hover': {
                      svg: {
                        fill: theme.palette.colorScheme.orangeMid,
                      },
                    },
                  }),
                })}
              >
                <Icons.TrashBin />
              </IconButton>
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
    </BorderedBox>
  );
};
