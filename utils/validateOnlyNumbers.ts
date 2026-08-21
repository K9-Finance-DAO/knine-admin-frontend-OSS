interface IValidateParams {
  value: string;
  isInteger?: boolean;
  decimals?: number;
  allowEmpty?: boolean;
}

export const validateOnlyNumbers = ({
  value,
  isInteger,
  decimals,
  allowEmpty,
}: IValidateParams): boolean => {
  const regexpTemplate = String.raw`^\d+(\.)?(\d{0,${decimals || 18}})?$|^$`;
  const integerRegex = allowEmpty ? /^$|[+]?[0-9]\d*$/ : /^[+]?[1-9]\d*$/;

  if ((isInteger && !value.match(integerRegex)) || value === '00') {
    return false;
  }
  return !(!value.match(regexpTemplate) || value === '00');
};
