export const filterObject = (obj, keys) =>
  keys.reduce(
    (filteredObj, currKey) => ({ ...filteredObj, [currKey]: obj[currKey] }),
    {}
  );
