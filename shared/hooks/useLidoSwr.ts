import { useWrapperSWR, SWRResponse } from '@knine-sdk/react';
import { SWRConfiguration } from 'swr';
import getConfig from 'next/config';
import { standardFetcher } from 'utils/standardFetcher';

const { serverRuntimeConfig } = getConfig();
const { basePath } = serverRuntimeConfig;

export const useLidoSWR = function <D = unknown, E = unknown>(
  path: string | null,
  config?: SWRConfiguration,
): SWRResponse<D, E> {
  return useWrapperSWR<D, E>(
    path ? `${basePath ?? ''}${path}` : null,
    standardFetcher,
    config,
  );
};
