const useAnimEngine = (
  participants,
  inOut,
  baseDelay = 225,
  staggerAmount = 150,
  overflow = true,
  staggerOffset = 0
) => {
  let staggerId = staggerOffset;
  return () => {
    const newDelay =
      baseDelay + staggerAmount * Math.round(Math.random() * 0.5 + staggerId++);
    const maxDelay =
      baseDelay +
      staggerAmount * Math.round(Math.random() * 0.5 + participants);
    const invDelay = maxDelay - newDelay;
    return {
      delay: {
        in: newDelay,
        out: invDelay,
        inDuration: overflow ? newDelay : baseDelay,
        outDuration: invDelay + baseDelay,
        maxDelay,
      },
      show: inOut,
    };
  };
};

export default useAnimEngine;
