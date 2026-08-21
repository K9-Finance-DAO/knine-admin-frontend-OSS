export const getDirtyValues = <
  D extends Record<string, unknown>,
  V extends Record<keyof D, unknown>,
>(
  dirtyFields: D,
  allValues: V,
): Partial<V> => {
  // ): Record<keyof D, string> => {

  const dirtyValues = Object.keys(dirtyFields).reduce((prev, key) => {
    if (!dirtyFields[key]) return prev;

    return {
      ...prev,
      [key]:
        typeof dirtyFields[key] === 'object'
          ? getDirtyValues(dirtyFields[key] as D, allValues[key] as V)
          : allValues[key],
    };
  }, {});

  return dirtyValues;
};
