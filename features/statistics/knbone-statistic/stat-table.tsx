import { FeeDistribution } from './fee-distribution';
import {
  DashboardSplitCard,
  NumberFormat,
  SplitCardCell,
  ImageWrapper,
} from 'shared/components';
import { FormatToken } from 'shared/formatters';
import { DATA_ZEROS, DEFAULT_FALLBACK } from 'config';
import { InlineLoader } from '@lidofinance/lido-ui';
import { useStatistic } from 'features/statistics/providers';

export const StatTable = () => {
  const { protocolFee, loading, totalPooled, apr } = useStatistic();

  const showLoader = loading.totalPooledLoading ? <InlineLoader /> : null;

  return (
    <DashboardSplitCard
      boxSx={{ padding: 2.5 }}
      columns={{ xs: 2, md: 3 }}
      innerSlot={<FeeDistribution />}
    >
      <SplitCardCell
        title="Total pooled bone"
        statSlot={
          <ImageWrapper
            contentImg={{
              src: '/kn-bone.webp',
              alt: 'kn bone logo',
            }}
          >
            {showLoader ?? (
              <FormatToken
                amount={totalPooled}
                symbol=""
                fallback={DATA_ZEROS}
              />
            )}
          </ImageWrapper>
        }
      />
      <SplitCardCell
        title="Current Apr"
        statSlot={
          <>
            <NumberFormat
              pending={loading.isAprLoading}
              number={apr}
              currency
              fallback={DEFAULT_FALLBACK}
            />{' '}
            %
          </>
        }
      />
      <SplitCardCell
        title="Protocol Fee"
        statSlot={
          <NumberFormat
            number={protocolFee}
            percent
            pending={loading.feesLoading}
            fallback={DATA_ZEROS}
          />
        }
      />
    </DashboardSplitCard>
  );
};
