import type { WalletAdapterData } from '@rnb-web3/types';

export type ConnectorProps = WalletAdapterData & { deeplink?: string } & any;
