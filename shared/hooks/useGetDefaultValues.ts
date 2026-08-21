import { useAwaiter } from 'shared/hooks/use-awaiter';
import { useCallback, useEffect } from 'react';

type GetDefaultProps<T> = {
  data: T | undefined;
  error: unknown;
  defaultState: T;
};

export const useGetDefaultValues = <T>({
  data,
  error,
  defaultState,
}: GetDefaultProps<T>) => {
  const { awaiter, resolver } = useAwaiter<T>(data);

  useEffect(() => {
    if (error && !resolver.isResolved) {
      resolver.resolve(defaultState);
    }
  }, [resolver, error]);

  const getDefaultValues = useCallback(
    () => (data ? Promise.resolve(data) : awaiter),
    [awaiter, data],
  );

  return { getDefaultValues };
};
