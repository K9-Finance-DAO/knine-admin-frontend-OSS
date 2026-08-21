import { FC, PropsWithChildren, createContext, useContext } from 'react';
import invariant from 'tiny-invariant';
import { LSBaseData } from './types';
import { useLSBaseContractData } from './useLSBaseContractData';

const LiquidStakingBaseDataContext = createContext({} as LSBaseData);
LiquidStakingBaseDataContext.displayName = 'LiquidStakingBaseDataContext';

export const LiquidStakingBaseDataProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const contractData = useLSBaseContractData();

  return (
    <LiquidStakingBaseDataContext.Provider value={contractData}>
      {children}
    </LiquidStakingBaseDataContext.Provider>
  );
};

export const useLiquidStakingBaseData = () => {
  const value = useContext(LiquidStakingBaseDataContext);
  invariant(
    value !== null,
    'useLiquidStakingBaseData was used used outside of LiquidStakingBaseDataProvider',
  );
  return value;
};
