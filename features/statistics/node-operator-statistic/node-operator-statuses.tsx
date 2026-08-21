import { memo } from 'react';
import { OperatorStatuses, useStatistic } from 'features/statistics/providers';
import {
  DashboardSplitCard,
  NumberFormat,
  SplitCardCell,
} from 'shared/components';
import { COLOR_BLACK } from 'styles';

const columnTitleConfig: { [key in keyof OperatorStatuses]: string } = {
  jailedNodeOperator: 'Jailed',
  activeNodeOperator: 'Active',
  ejectedNodeOperator: 'Ejected',
  inactiveNodeOperator: 'Inactive',
  unstakedNodeOperator: 'Unstaked',
};

type OperatorStatusEntries = keyof Required<OperatorStatuses>;

export const NodeOperatorStatuses = memo(() => {
  const { operatorsStatuses, loading } = useStatistic();

  return (
    <DashboardSplitCard
      boxSx={{ paddingY: 2.75, mt: 2.5, background: COLOR_BLACK }}
      columns={{ xs: 3, md: 5 }}
    >
      {Object.entries(operatorsStatuses).map(([key, value]) => (
        <SplitCardCell
          key={key}
          title={columnTitleConfig[key as OperatorStatusEntries] ?? ''}
          statSlot={
            <NumberFormat
              number={value?.toString()}
              ETH
              pending={loading.isNodeOperatorStatusesLoading}
            />
          }
        />
      ))}
    </DashboardSplitCard>
  );
});

NodeOperatorStatuses.displayName = 'NodeOperatorStatuses';
