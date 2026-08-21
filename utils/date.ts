export const getUnixTimestamp = (date = new Date(), inMs = false) => {
  const timestampInMilliseconds = date.getTime();

  return Math.floor(timestampInMilliseconds / (inMs ? 1 : 1000));
};
