const defaultDelayTime = () =>
  parseInt(process.env.REACT_APP_SWITCHSCREENINITIALPAUSE);

const useAnimEngine = (
  participants,
  inOut,
  timing,
  staggerAmount = 150,
  overflow = false,
  staggerOffset = 0
) => {
  let staggerId = staggerOffset;
  let baseDelay = defaultDelayTime();
  let duration = baseDelay;

  if (typeof timing === "object") {
    console.log("Timing is object!! delay before: ", baseDelay);
    baseDelay = timing.delay || baseDelay;
    duration = timing.duration;
    console.log("   Timing is object!! after ", baseDelay, duration);
  }

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
        inDuration: overflow ? newDelay : duration,
        outDuration: overflow ? maxDelay - newDelay : duration,
        maxDelay,
      },
      show: inOut,
    };
  };
};

export default useAnimEngine;
