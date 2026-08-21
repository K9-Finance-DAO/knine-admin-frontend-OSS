import { Stack, Typography } from '@mui/material';
import { BigNumber } from 'ethers';
import { ValidatorCard } from 'features/statistics/validators/validator-card';
import { useStatistic } from 'features/statistics/providers';
import { InlineLoader } from '@lidofinance/lido-ui';

export const Validators = () => {
  const { validators, loading } = useStatistic();
  return (
    <>
      <Typography
        variant="body2"
        className="medium"
        color={(theme) => theme.palette.colorScheme.light}
        mt={3.5}
        mb={2.25}
      >
        Validators
      </Typography>

      <Stack spacing={2}>
        {loading.isValidatorsLoading && <InlineLoader />}

        {!loading.isValidatorsLoading &&
          validators?.length &&
          validators.map(
            ({ id, validator_id, image_url, name, address, total_staked }) => (
              <ValidatorCard
                key={id}
                address={address}
                id={validator_id}
                name={name}
                imageUrl={image_url}
                totalStaked={BigNumber.from(total_staked)}
              />
            ),
          )}
      </Stack>
    </>
  );
};
