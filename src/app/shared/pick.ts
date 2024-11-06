const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (obj && obj.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

export default pick;
