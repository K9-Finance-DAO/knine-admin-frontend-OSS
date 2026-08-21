import { Section } from 'shared/components';
import { AddNewAdminForm } from './add-new-admin-form';
import { AdminsList } from './admins-list';
import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';
import { AccessContractType } from './hooks';
import { AddNewAdminFormProvider } from './add-new-admin-form/form-context';
import { AccessDataProvider } from './provider';
import { useRouter } from 'next/router';
import { useQueryState } from 'nuqs';

export type AccessTab = keyof typeof AccessContractType;

export const AccessSection = () => {
  const { isReady } = useRouter();
  const [tab, setTab] = useQueryState<AccessTab>('tab', {
    defaultValue: 'liquidStaking',
    shallow: false,
    parse: (query) => query as AccessTab,
  });

  const handleChange = useCallback(
    async (_: SyntheticEvent, newValue: AccessTab) => {
      await setTab(newValue);
    },
    [setTab],
  );

  return (
    <Section>
      <Tabs value={tab} onChange={handleChange} role="tablist">
        {Object.keys(AccessContractType).map((key) => (
          <Tab
            key={key}
            role="tab"
            label={AccessContractType[key as AccessTab]}
            value={key}
            disabled={!isReady}
          />
        ))}
      </Tabs>
      <AccessDataProvider activeTab={tab}>
        <AddNewAdminFormProvider>
          <AddNewAdminForm />
        </AddNewAdminFormProvider>
        <AdminsList />
      </AccessDataProvider>
    </Section>
  );
};
