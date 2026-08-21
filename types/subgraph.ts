import { CHAINS_IDS } from 'utils/chains';

export type SubgraphChains = Exclude<CHAINS_IDS, CHAINS_IDS.Goerli>;
