export const normalizeDecimalValue = (value: string, allowNegative = false) => {
  let processedValue = value.replace(',', '.');

  // -32 to -> 32
  if (!allowNegative && processedValue[0] === '-') {
    processedValue = processedValue.slice(1);
  }

  // .32 to -> 0.32
  if (processedValue[0] === '.') {
    processedValue = '0' + processedValue;
  }

  // // 032 to -> 0.32
  if (
    processedValue.length > 1 &&
    processedValue[0] === '0' &&
    processedValue[1] != '.'
  ) {
    processedValue = '0.' + processedValue.slice(1);
  }

  return processedValue;
};
