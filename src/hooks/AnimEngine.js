const useAnimEngine = (
  participants,
  inOut,
  baseDelay = 225,
  staggerAmount = 150,
  startId = 0
) => {
  let staggerId = startId;
  return () => {
    const newDelay =
      baseDelay + staggerAmount * Math.round(Math.random() * 0.5 + staggerId++);
    const maxDelay =
      baseDelay +
      staggerAmount * Math.round(Math.random() * 0.5 + participants);
    const invDelay = baseDelay + maxDelay - newDelay;
    return {
      delay: {
        in: newDelay,
        out: invDelay,
        maxDelay,
      },
      show: inOut,
    };
  };
};

export default useAnimEngine;
