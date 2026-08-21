import {
  useQueryStates,
  UseQueryStatesKeysMap,
  UseQueryStatesOptions,
  Values,
} from 'nuqs';
import { useCallback } from 'react';

const mapToNullable = <T extends UseQueryStatesKeysMap>(
  queryObj: T,
): Values<T> => {
  return Object.keys(queryObj).reduce((acc: any, key) => {
    acc[key] = null;

    return acc;
  }, {} as T);
};

const DEFAULT_OPTIONS: Partial<UseQueryStatesOptions> = {
  history: 'push',
  shallow: false,
};

export const useNextQueryParams = <T extends UseQueryStatesKeysMap>(
  queryMap: T,
  options: Partial<UseQueryStatesOptions> = DEFAULT_OPTIONS,
) => {
  const [queryParams, setQueryParams] = useQueryStates<T>(queryMap, options);

  const updateQueryParams = useCallback(
    async (newParams: Parameters<typeof setQueryParams>[0]) => {
      await setQueryParams(newParams);
    },
    [setQueryParams],
  );

  const resetValues = useCallback(async () => {
    return await setQueryParams(mapToNullable(queryMap));
  }, [queryMap, setQueryParams]);

  return {
    queryParams,
    updateQueryParams,
    clearQueries: resetValues,
  };
};
