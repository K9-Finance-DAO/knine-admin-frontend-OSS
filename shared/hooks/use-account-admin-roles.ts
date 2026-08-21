import { useWrapperSWR } from '@knine-sdk/react';
import { standardFetcher, STRATEGY_CONSTANT } from 'utils';
import { dynamics } from 'config';
import { useAuthToken } from './use-auth-token';

export type AccountAdminRoles = Record<string, string[]>;

export const useAccountAdminRoles = () => {
  const { authToken } = useAuthToken();

  return useWrapperSWR<AccountAdminRoles>(
    authToken ? ['swr-account-admin-roles', authToken] : null,
    async () => {
      const data = await standardFetcher<AccountAdminRoles>(
        `${dynamics.knineAPIBasePath}/access_control/`,
      );

      return data;
    },
    STRATEGY_CONSTANT,
  );
};
