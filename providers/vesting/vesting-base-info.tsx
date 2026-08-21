import { FC, PropsWithChildren, createContext, useContext } from 'react';
import invariant from 'tiny-invariant';

const VestingBaseDataContext = createContext({});
VestingBaseDataContext.displayName = 'VestingBaseDataContext';

export const VestingBaseDataProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <VestingBaseDataContext.Provider value={{}}>
      {children}
    </VestingBaseDataContext.Provider>
  );
};

export const useVestingBaseData = () => {
  const value = useContext(VestingBaseDataContext);
  invariant(
    value !== null,
    'useVestingBaseData was used used outside of VestingBaseDataProvider',
  );
  return value;
};
