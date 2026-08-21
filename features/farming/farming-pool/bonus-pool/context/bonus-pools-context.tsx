import { FC, PropsWithChildren, createContext, useContext } from 'react';

import invariant from 'tiny-invariant';
import { useBonusPools } from '../hooks';

const BonusPoolsContext = createContext<BonusPoolsDataValue | null>(null);
BonusPoolsContext.displayName = 'BonusPoolsContext';

export type BonusPoolsDataValue = ReturnType<typeof useBonusPools>;

export const BonusPoolsProvider: FC<PropsWithChildren> = ({ children }) => {
  const bonusPools = useBonusPools();

  return (
    <BonusPoolsContext.Provider value={bonusPools}>
      {children}
    </BonusPoolsContext.Provider>
  );
};

export const useBonusPoolsData = () => {
  const r = useContext(BonusPoolsContext);
  invariant(r, 'useBonusPoolsData was used outside of BonusPoolsContext');
  return r;
};
