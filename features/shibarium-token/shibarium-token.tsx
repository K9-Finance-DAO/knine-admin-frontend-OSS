import { Section } from 'shared/components';
import NoSSRWrapper from 'shared/components/no-ssr-wrapper';
import { ShibariumTokenStatus } from './features';
import { Fallback } from 'shared/wallet';
import { dynamics } from 'config';

export const ShibariumToken = () => {
  return (
    <NoSSRWrapper>
      <Section component="section" pt={3.5} pb={9}>
        <Fallback forcedChainId={dynamics.defaultChain} mb={3.5} />
        <ShibariumTokenStatus />
      </Section>
    </NoSSRWrapper>
  );
};
