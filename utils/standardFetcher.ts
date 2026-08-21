import { extractErrorMessage } from 'utils';
import { FetcherError } from './fetcherError';
import { AUTH_TOKEN_KEY } from 'shared/hooks';

const DEFAULT_PARAMS = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
  },
};

const extractError = async (response: Response) => {
  try {
    const error = await response.json();
    return extractErrorMessage(error);
  } catch (error) {
    return 'An error occurred while fetching the data';
  }
};

type StandardFetcher = <T>(url: string, params?: RequestInit) => Promise<T>;

export const standardFetcher: StandardFetcher = async (url, params) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  const headers = new Headers({
    ...DEFAULT_PARAMS.headers,
    ...params?.headers,
  });

  if (token) {
    const parsedToken = JSON.parse(token);

    if (parsedToken.trim()) {
      headers.set('Authorization', `Token ${parsedToken}`);
    }
  }

  const response = await fetch(url, {
    ...DEFAULT_PARAMS,
    ...params,
    headers,
  });

  if (!response.ok) {
    throw new FetcherError(await extractError(response), response.status);
  }

  return await response.json();
};
