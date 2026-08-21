import {
  DashboardSplitCard,
  ImageWrapper,
  NumberFormat,
  SplitCardCell,
} from 'shared/components';
import { FormatToken } from 'shared/formatters';
import { DATA_ZEROS } from 'config';
import { useStatistic } from 'features/statistics/providers';
import { NodeOperatorStatuses } from './node-operator-statuses';

export const NodeOperatorStatTable = () => {
  const { distanceMinMax, maxAmount, minAmount } = useStatistic();

  return (
    <DashboardSplitCard
      innerSlot={<NodeOperatorStatuses />}
      columns={{ xs: 2, md: 3 }}
      boxSx={{ padding: 2.5 }}
    >
      <SplitCardCell
        title="Сurrent Min-Max Stake DISTANCE"
        statSlot={
          <NumberFormat
            number={distanceMinMax?.toString()}
            ETH
            percent
            fallback={DATA_ZEROS}
          />
        }
      />
      <SplitCardCell
        title="min STAKE Amount"
        statSlot={
          <ImageWrapper
            contentImg={{
              src: '/bone.webp',
              alt: 'bone logo',
            }}
          >
            <FormatToken amount={minAmount} symbol="" fallback={DATA_ZEROS} />
          </ImageWrapper>
        }
      />
      <SplitCardCell
        title="max STAKE Amount"
        statSlot={
          <ImageWrapper
            contentImg={{
              src: '/bone.webp',
              alt: 'bone logo',
            }}
          >
            <FormatToken amount={maxAmount} symbol="" fallback={DATA_ZEROS} />
          </ImageWrapper>
        }
      />
    </DashboardSplitCard>
  );
};
