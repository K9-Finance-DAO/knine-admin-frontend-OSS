import { Box, Divider, Stack, Typography } from '@mui/material';
import { EditableInputGroupHookForm } from 'shared/hook-form/controls';

export const Addresses = () => {
  return (
    <Stack spacing={2} mt={4}>
      <Typography className="medium">Address</Typography>
      <Divider className="stroke" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          gap: '16px',
        }}
      >
        <EditableInputGroupHookForm
          fieldName="daoAddress"
          placeholder="0x"
          label="DAO"
        />
        <EditableInputGroupHookForm
          fieldName="nodeOperatorAddress"
          placeholder="0x"
          label="Node Operator Registry"
        />
        <EditableInputGroupHookForm
          fieldName="unstBONEAddress"
          placeholder="0x"
          label="UnstBone"
        />
        <EditableInputGroupHookForm
          fieldName="instantPoolAddress"
          placeholder="0x"
          label="Instant Pool"
        />
        <EditableInputGroupHookForm
          fieldName="l2StakingAddress"
          placeholder="0x"
          label="L2 Staking"
        />
      </Box>
    </Stack>
  );
};
