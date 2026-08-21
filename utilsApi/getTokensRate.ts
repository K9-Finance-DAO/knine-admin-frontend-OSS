import { standardFetcher } from 'utils';
import getConfig from 'next/config';

type BackendRates = {
  'BONE/USD': number;
  'BONE/knBONE': number;
  'knBONE/BONE': number;
  'knBONE/USD': number;
};

export type Rates = {
  [K in keyof BackendRates as K extends `${infer A}/${infer B}`
    ? `${Lowercase<A>}${Capitalize<Lowercase<B>>}`
    : never]: BackendRates[K];
};

const slashLetterRegex = /\/([a-zA-Z])/g;

const serializeRatesToCamelCase = (rates: Rates): Rates => {
  const serializedRates: Rates = {} as Rates;

  for (const [key, value] of Object.entries(rates)) {
    if (Object.prototype.hasOwnProperty.call(rates, key)) {
      const newKey = key
        .toLowerCase()
        .replace(slashLetterRegex, (_, letter) =>
          letter.toUpperCase(),
        ) as keyof Rates;

      serializedRates[newKey] = value;
    }
  }

  return serializedRates;
};

const { serverRuntimeConfig } = getConfig();
const { knineBackendApi } = serverRuntimeConfig;

export const getTokensRate = async (): Promise<Rates> => {
  console.debug('[getTokensRate] Rates fetching');

  const rates: Rates = await standardFetcher(`${knineBackendApi}/rates/`);

  const serialized = serializeRatesToCamelCase(rates);

  console.debug('[getTokensRate] Got token rates:', serialized);
  return serialized;
};
