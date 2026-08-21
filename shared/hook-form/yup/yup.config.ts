import * as Yup from 'yup';
import { isValidAnyAddress } from 'features/liquid-staking/rewards/utils';
import {
  DEFAULT_INVALID_ADDRESS_ERROR,
  getLimitsErrorMessage,
  getMaxSumErrorMessage,
  NUMBER_TYPEERROR_MESSAGE,
} from './error-messages';
import { validateOnlyNumbers } from 'utils';
import { BigNumber } from 'ethers';
import {
  checkIfFilesAreCorrectType,
  checkIfFilesAreTooBig,
} from '../../components/file-uploader/helpers';

// === Custom Yup Methods ===
Yup.addMethod(
  Yup.string,
  'isValidAddress',
  function isValidAddress(message: string) {
    return this.test(
      'isValidAddress',
      (message = DEFAULT_INVALID_ADDRESS_ERROR),
      (address) => (address ? isValidAnyAddress(address) : true),
    );
  },
);

type ValidateLimits = {
  minValue?: number;
  maxValue?: number;
  strict?: boolean;
};

Yup.addMethod(
  Yup.string,
  'validateLimits',
  function validateLimits({
    minValue = undefined,
    maxValue = undefined,
    strict = false,
  }: ValidateLimits) {
    return this.test(
      'validateLimits',
      getLimitsErrorMessage(minValue, maxValue, strict),
      (value) => {
        if (!value) {
          return true;
        }

        const numericValue = +value;
        const maxValueProvided = maxValue !== undefined;
        const minValueProvided = minValue !== undefined;

        if (minValueProvided && maxValueProvided) {
          return strict
            ? numericValue > minValue && numericValue < maxValue
            : numericValue >= minValue && numericValue <= maxValue;
        }

        if (minValueProvided) {
          return strict ? numericValue > minValue : numericValue >= minValue;
        }

        if (maxValueProvided) {
          return strict ? numericValue < maxValue : numericValue <= maxValue;
        }

        return true;
      },
    );
  },
);

Yup.addMethod(
  Yup.string,
  'isOnlyNumbers',
  function isOnlyNumbers(message = NUMBER_TYPEERROR_MESSAGE, isInteger = true) {
    return this.test('isOnlyNumbers', message, (str) => {
      if (str) {
        return validateOnlyNumbers({
          value: str,
          isInteger,
          allowEmpty: true,
        });
      }

      return true;
    });
  },
);

Yup.addMethod(Yup.mixed, 'isBigNumber', function () {
  return this.test('isBigNumber', 'must be a valid number', function (value) {
    return BigNumber.isBigNumber(value);
  });
});

Yup.addMethod(
  Yup.string,
  'validateSum',
  function validateSum(maxValue: number) {
    return this.test(
      'validateSum',
      getMaxSumErrorMessage(maxValue),
      async (value, context) => {
        const { parent } = context;

        // Todo: think how to optimise
        const total = Object.values(parent).reduce(
          (acc: number, curr) => acc + Number(curr),
          0,
        );

        return context.resolve(total <= 100);
      },
    );
  },
);

export const validateMedia = (mediaSize: number) =>
  Yup.mixed()
    .notRequired()
    .test('is-correct-file', 'Invalid file type', (val: any) =>
      checkIfFilesAreCorrectType(val),
    )
    .test('is-big-file', 'File too big', (file: any) =>
      checkIfFilesAreTooBig(mediaSize, file),
    );

declare module 'yup' {
  interface StringSchema {
    isValidAddress(message?: string): StringSchema;
    isOnlyNumbers(message?: string, isInteger?: boolean): StringSchema;
    validateSum(maxValue: number): StringSchema;

    validateLimits(props: ValidateLimits): StringSchema;
  }
  interface MixedSchema {
    isBigNumber(message?: string): MixedSchema;
  }
}
export default Yup;
