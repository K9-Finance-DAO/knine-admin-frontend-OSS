// TODO: path + basePath
export const HOME_PATH = '/';
export const STATISTICS_PATH = '/statistics';
export const ACCESS_PATH = '/access';
export const LIQUID_STAKING_PATH = '/liquid-staking';
export const NODE_OPERATOR_REGISTRY_PATH = '/node-operator-registry';
export const SHIBARIUM_TOKEN_PATH = '/shibarium-token';
export const REAL_YIELD_STAKING_PATH = '/real-yield-staking';
export const FARMING_PATH = '/farming';
export const FARMING_CREATE_PATH = '/farming/create';
export const FARMING_EDIT_PATH = '/farming/edit/[id]';
export const VESTING_PATH = '/vesting';

export const getPathWithoutFirstSlash = (path: string): string => {
  if (path.length === 0 || path[0] !== '/') return path;

  return path.slice(1, path.length);
};

export const getBasePath = (path: string) => {
  const pathWithoutFirstSlash = getPathWithoutFirstSlash(path);

  return `/${pathWithoutFirstSlash.split('/')[0]}`;
};
