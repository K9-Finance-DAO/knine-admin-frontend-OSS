export type FetchRpcInitBody = {
  jsonrpc: '1.0' | '2.0' | string;
  method: string;
  params?: unknown;
  id?: string | number | null;
};

// eslint-disable-next-line no-undef
export type FetchRpcInit = Omit<RequestInit, 'body' | 'method'> & {
  method?: 'POST';
  body: FetchRpcInitBody | FetchRpcInitBody[];
};

export type FetchRpc = (url: string, init: FetchRpcInit) => Promise<Response>;

export const fetchRpc: FetchRpc = (url, init) =>
  fetch(url, {
    ...init,
    method: 'POST',
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(init.body),
  });
