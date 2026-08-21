import { useConnectorInfo } from 'rnb-web3/web3-react';
import { useAppFlag } from 'providers/app-flag';

export const useIsLedgerLive = () => {
  const appFlag = useAppFlag();
  const { isLedgerLive } = useConnectorInfo();

  return appFlag === 'ledger-live' || isLedgerLive;
};
