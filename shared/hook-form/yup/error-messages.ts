export const NUMBER_TYPEERROR_MESSAGE = 'Must be a number';
export const DEFAULT_INVALID_ADDRESS_ERROR = 'Invalid address';

export const getLimitsErrorMessage = (
  minValue?: string | number,
  maxValue?: string | number,
  strict?: boolean,
) => {
  if (minValue && maxValue) {
    return `Value must be between ${minValue} and ${maxValue}`;
  }

  if (maxValue) {
    return `Value must be ${strict ? 'strictly ' : ''}less than or equal to ${maxValue}`;
  }

  if (minValue) {
    return `Value must be ${strict ? 'strictly ' : ''}greater than or equal to ${minValue}`;
  }

  return 'Invalid value';
};

export const getMaxSumErrorMessage = (value: number, strictEqual = false) =>
  `The total sum of all fields should be ${!strictEqual ? 'less than or' : ''} equal to ${value}`;
