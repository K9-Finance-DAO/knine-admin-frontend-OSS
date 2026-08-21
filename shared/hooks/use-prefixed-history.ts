import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const usePrefixedPush = () => {
  const router = useRouter();
  type Args = Parameters<typeof router.push>;
  return useCallback(
    (
      url: string,
      query?: Record<string, string>,
      a1?: Args[1],
      a2?: Args[2],
    ) => {
      return router.push(url, a1, a2);
    },
    [router],
  );
};
