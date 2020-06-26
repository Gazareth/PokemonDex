const pick = (obj, keys) =>
  keys.reduce(
    (filteredObj, currKey) => ({ ...filteredObj, [currKey]: obj[currKey] }),
    {}
  );

export default pick;
