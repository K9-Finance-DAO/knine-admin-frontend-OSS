export type EnvConfigRaw = {
  defaultChain: string | number;
  liquidStakingDefaultChain: string | number;
  supportedChains: number[];
  walletconnectProjectId: string;
};

export type EnvConfigParsed = {
  defaultChain: number;
  liquidStakingDefaultChain: string | number;
  supportedChainIds: number[];
  walletconnectProjectId: string;
};
