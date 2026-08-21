import { standardFetcher } from 'utils';
import { dynamics } from 'config';

const API_PATH = dynamics.knineAPIBasePath;

export const validateToken = async (address: string) => {
  try {
    const apiUrl = `${API_PATH}/farming-pools/validate-token/`;
    const response = await standardFetcher<{ valid: boolean }>(apiUrl, {
      body: JSON.stringify({ token_address: address }),
      method: 'POST',
    });

    return response.valid;
  } catch (err: unknown) {
    console.error('validateToken error:', err);
    return false;
  }
};
