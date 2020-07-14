const useAnimEngine = (
  participants,
  inOut,
  baseDelay = parseInt(process.env.REACT_APP_SWITCHSCREENINITIALPAUSE),
  staggerAmount = 150,
  overflow = true,
  staggerOffset = 0
) => {
  let staggerId = staggerOffset;
  return () => {
    const _staggerAmount = Math.min(
      staggerAmount,
      (process.env.REACT_APP_SWITCHSCREENDELAY - baseDelay) / participants
    );
    const newDelay =
      baseDelay + _staggerAmount * (Math.random() * 0.5 + staggerId++);
    const maxDelay = baseDelay + _staggerAmount * participants;
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
