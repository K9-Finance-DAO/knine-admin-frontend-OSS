import { FieldValues } from 'react-hook-form';
import { BigNumber } from 'ethers';
import { isObject } from 'lodash';

type ObjectValues<T> = T extends Record<string, infer U> ? U[] : never;

export const serializeValueToContractParams = <T extends FieldValues>(
  value: T[keyof T],
): Array<BigNumber> | ObjectValues<T> | string[] | number[] => {
  if (isObject(value) && !BigNumber.isBigNumber(value)) {
    return Object.values(value) as ObjectValues<typeof value>;
  }

  return [value];
};
