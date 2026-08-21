import { useWrapperSWR } from '@knine-sdk/react';
import { useAuthToken } from 'shared/hooks';
import { standardFetcher, STRATEGY_LAZY } from 'utils';
import { dynamics } from 'config';
import { AdminRole } from '../types';

export type AllAdminRoles = {
  [key: string]: AdminRole[];
};

const API_PATH = dynamics.knineAPIBasePath;

export const useAllAdminRoles = () => {
  const { authToken } = useAuthToken();
  const apiUrl = `${API_PATH}/access_control/all/`;
  return useWrapperSWR<AllAdminRoles>(
    authToken ? apiUrl : null,
    standardFetcher,
    STRATEGY_LAZY,
  );
};
