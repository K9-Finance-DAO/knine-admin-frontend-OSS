import { useState, useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import { useRouter } from 'next/router';
import { camelize, getUnixTimestamp, standardFetcher } from 'utils';
import { dynamics } from 'config';
import type { BonusPoolItem, BonusPools } from '../types';
import { BonusPoolStatuses } from '../types';
import { compareDesc } from 'date-fns';
import { useChainId } from 'shared/hooks';

const API_PATH = dynamics.knineAPIBasePath;

const checkNewPoolsUnavailable = (pools: BonusPoolItem[]) => {
  const committedBonusPools = pools.find(
    (p) =>
      p.status?.toLowerCase() === BonusPoolStatuses.COMMITTED?.toLowerCase(),
  );

  if (!committedBonusPools) {
    return false;
  }

  return (
    !!committedBonusPools.endTime &&
    compareDesc(getUnixTimestamp(), committedBonusPools.endTime) >= 0
  );
};

export const useBonusPools = () => {
  const { defaultChain, currentChainId } = useChainId();
  const { isReady, query } = useRouter();
  const address = isReady
    ? Array.isArray(query.id)
      ? query.id[0]
      : query.id
    : undefined;

  const [totalPages, setTotalPages] = useState(0);

  const getKey = useCallback(
    (pageIndex: number, previousPageData: BonusPools[]) => {
      if (!address) return null;
      if (pageIndex !== 0 && previousPageData && previousPageData.length === 0)
        return null;

      return `bonusPools-${pageIndex + 1}-${address}`; // api accepts 1 as initial
    },
    [address],
  );

  const { data, error, size, setSize, mutate } = useSWRInfinite<
    BonusPoolItem[]
  >(
    getKey,
    async (key) => {
      const index = key.split('-')[1];
      const url = `${API_PATH}/farming-pools/${address}/bonus-pools?page=${index}`;

      const data = await standardFetcher(url);
      const camelizedData = camelize(data) as BonusPools;

      if (!totalPages) {
        setTotalPages(camelizedData.totalPages);
      }

      return camelizedData.results;
    },
    {
      revalidateAll: false,
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      shouldRetryOnError: false,
      revalidateOnMount: true,
    },
  );

  const loadBonusPools = useCallback(async () => {
    await setSize((prevPage) => prevPage + 1);
  }, [setSize]);

  const isLoadingInitialData = !data && !error;
  const canLoadMore = data && size !== totalPages;

  const isEmpty = !isLoadingInitialData && data?.[0]?.length === 0;
  const bonusPoolList = data?.flat() as BonusPoolItem[];

  const isAddBonusPoolDisabled = useMemo(() => {
    if (defaultChain !== currentChainId) {
      return true;
    }

    return bonusPoolList?.length > 0 && checkNewPoolsUnavailable(bonusPoolList);
  }, [bonusPoolList, currentChainId, defaultChain]);

  return {
    address,
    bonusPoolList,
    loadMore: loadBonusPools,
    initialLoading: isLoadingInitialData,
    isEmpty,
    error,
    canLoadMore,
    mutate,
    isAddBonusPoolDisabled,
  };
};
