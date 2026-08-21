export type RetryOptions<T> = {
  retryCount: number;
  delay: (n: number) => number;
  resolver?: (data: T) => Promise<T>;
  rejecter?: (error: unknown) => Promise<any>;
};

const defaultResolver = <T>(data: T): Promise<T> => {
  return Promise.resolve(data);
};

const defaultRejecter = <T>(err: T): Promise<T> => {
  return Promise.reject(err);
};

export const retry = <T>(
  fn: () => Promise<T>,
  { retryCount, delay, resolver, rejecter }: RetryOptions<T>,
) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let tryCount = 0;

    const _resolver = resolver ?? defaultResolver;
    const _rejecter = rejecter ?? defaultRejecter;

    const doRetry = async (error: unknown) => {
      const shouldStop = await _rejecter(error);

      if (retryCount-- <= 0 || shouldStop) {
        reject(error);
        return;
      }

      setTimeout(callApi, delay(++tryCount));
    };

    await callApi();

    // eslint-disable-next-line func-style
    async function callApi() {
      try {
        void Promise.resolve(fn()).then(_resolver).then(resolve).catch(doRetry);
      } catch (err) {
        await doRetry(err);
      }
    }
  });
};
