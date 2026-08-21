import { EnvConfigRaw, EnvConfigParsed } from 'config/types';

export const parseEnvConfig = (envConfig: EnvConfigRaw): EnvConfigParsed => {
  return {
    defaultChain: Number(envConfig.defaultChain),
    liquidStakingDefaultChain: Number(envConfig.liquidStakingDefaultChain),
    supportedChainIds: envConfig.supportedChains,
    walletconnectProjectId: envConfig.walletconnectProjectId,
  };
};
