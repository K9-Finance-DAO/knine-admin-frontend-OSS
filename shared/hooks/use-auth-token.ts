import { useCallback } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { dynamics } from 'config';
import { standardFetcher } from 'utils';
import { useLocalStorage } from '@knine-sdk/react';
import { useRouter } from 'next/router';
import { HOME_PATH } from 'config/urls';

export const AUTH_TOKEN_KEY = 'auth_token';

export const useAuthToken = () => {
  const [authToken, setAuthToken] = useLocalStorage(AUTH_TOKEN_KEY, '');
  const { push, pathname } = useRouter();

  const getAuthToken = useCallback(
    async (address: string, providerWeb3: Web3Provider) => {
      try {
        const url = dynamics.knineAPIBasePath;
        const messageToSign = await standardFetcher<string>(
          `${url}/wallet/get_message/`,
        );
        const signer = providerWeb3.getSigner(address);
        const signedMessage = await signer.signMessage(messageToSign);
        const data: any = await standardFetcher(`${url}/wallet/connect/`, {
          method: 'POST',
          body: JSON.stringify({
            address,
            signed_msg: signedMessage,
            message: messageToSign,
          }),
        });
        if (data.token) {
          setAuthToken(data.token);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [setAuthToken],
  );

  const removeAuthToken = useCallback(() => {
    setAuthToken('');
    if (pathname !== HOME_PATH) {
      void push(HOME_PATH);
    }
  }, [pathname, push, setAuthToken]);

  return { authToken, removeAuthToken, getAuthToken };
};
