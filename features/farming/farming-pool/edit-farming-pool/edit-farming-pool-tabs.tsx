import { useRouter } from 'next/router';
import { useQueryState } from 'nuqs';
import { SyntheticEvent, useCallback } from 'react';
import { Tab, Tabs } from '@mui/material';
import { EditPoolForm } from './edit-pool-form/edit-pool-form';
import { Section } from 'shared/components';
import { BonusPool } from '../bonus-pool/bonus-pool';

export type EditMode = 'farm' | 'bonusPool';

export const EditFarmingPoolTabs = () => {
  const { isReady } = useRouter();
  const [tab, setTab] = useQueryState('tab', {
    defaultValue: 'farm',
    shallow: false,
  });

  const handleChange = useCallback(
    async (_: SyntheticEvent, newValue: EditMode) => {
      await setTab(newValue);
    },
    [setTab],
  );

  const isFarmTab = tab === 'farm';

  return (
    <Section mt={2} spacing={0}>
      <Tabs
        value={tab}
        onChange={handleChange}
        role="tablist"
        aria-label="Edit farming pool tabs"
      >
        <Tab value="farm" role="tab" label="Farming pool" disabled={!isReady} />
        <Tab
          value="bonusPool"
          role="tab"
          label="Bonus reward pools"
          disabled={!isReady}
        />
      </Tabs>

      {isFarmTab ? <EditPoolForm /> : <BonusPool />}
    </Section>
  );
};
