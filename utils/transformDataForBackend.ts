import { getEncodedMedia } from 'utils/getEncodedMedia';
import { snakeize } from 'utils/camelize';
import { BigNumber } from 'ethers';

export const convertDateToUTCTimestamp = (d: Date, toMs = false): number => {
  const date = new Date(d);
  const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * 60000; // Always in milliseconds

  // Get the local timestamp and adjust for the timezone offset
  const localTimestamp = date.getTime();
  const utcTimestamp = localTimestamp - timezoneOffsetInMilliseconds;

  return toMs ? Number(utcTimestamp) : Math.floor(utcTimestamp / 1000);
};

const isFileAndBlob = (item: unknown) => {
  return item instanceof File && item instanceof Blob;
};

const isValidDate = (value: unknown) => value instanceof Date;

export const transformDataForBackend = async <T extends object>(
  data: T,
): Promise<any> => {
  const transformed = await Object.entries(data).reduce(
    async (accPromise, [key, value]) => {
      const acc = await accPromise;

      if (!value) {
        return acc;
      }

      if (isFileAndBlob(value)) {
        acc[key] = await getEncodedMedia(value);
        return acc;
      }

      if (isValidDate(value)) {
        acc[key] = convertDateToUTCTimestamp(value);
        return acc;
      }

      if (typeof value === 'object' && !BigNumber.isBigNumber(value)) {
        acc[key] = await transformDataForBackend(value);
        return acc;
      }

      if (BigNumber.isBigNumber(value)) {
        acc[key] = value.toString();
        return acc;
      }

      acc[key] = value;
      return acc;
    },
    Promise.resolve({} as any),
  );

  return snakeize(transformed);
};
