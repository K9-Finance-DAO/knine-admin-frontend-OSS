import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { compareWithRouterPathInInfra } from 'utils/compare-with-router-path';

export const useCompareWithRouterPath = (href: string) => {
  const router = useRouter();

  return useMemo(
    () => compareWithRouterPathInInfra(router.asPath, href),
    [router.asPath, href],
  );
};
