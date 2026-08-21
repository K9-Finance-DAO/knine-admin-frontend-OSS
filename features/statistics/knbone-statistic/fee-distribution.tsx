import {
  DashboardSplitCard,
  NumberFormat,
  SplitCardCell,
} from 'shared/components';
import { type FeeDistributionType } from 'providers/liquid-staking-base-info';
import { memo } from 'react';
import { DATA_ZEROS } from 'config';
import { Box, Typography } from '@mui/material';
import { FeeDistributionTitleBox } from 'features/statistics/styles';
import { COLOR_BLACK } from 'styles';
import { useStatistic } from 'features/statistics/providers';

const columnTitleConfig: { [key in keyof FeeDistributionType]: string } = {
  dao: 'DAO TRESUARY',
  instantPool: 'INSTANT REWARDS',
  operators: 'VALIDATOR REWARDS',
  staking: 'KNINE STAKING',
};

export const FeeDistribution = memo(() => {
  const { feeDistribution, loading } = useStatistic();

  return (
    <Box mt={2.25}>
      <FeeDistributionTitleBox>
        <Typography variant="caption" className="xs medium">
          Protocol Fee Distribution
        </Typography>
      </FeeDistributionTitleBox>
      <DashboardSplitCard
        boxSx={{ paddingY: 2.75, background: COLOR_BLACK }}
        columns={{ xs: 2, md: 4 }}
      >
        {Object.entries(feeDistribution).map(([key, value]) => (
          <SplitCardCell
            key={key}
            title={columnTitleConfig?.[key as keyof FeeDistributionType]}
            statSlot={
              <NumberFormat
                pending={loading.feesLoading}
                number={value}
                percent
                fallback={DATA_ZEROS}
              />
            }
          />
        ))}
      </DashboardSplitCard>
    </Box>
  );
});

FeeDistribution.displayName = 'FeeDistribution';
