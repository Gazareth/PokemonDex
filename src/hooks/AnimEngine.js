const defaultDelayTime = () =>
  parseInt(process.env.REACT_APP_SWITCHSCREENINITIALPAUSE);

const defaultTotalTime = () =>
  parseInt(process.env.REACT_APP_SWITCHSCREENDELAY);

const useAnimEngine = (
  participants,
  inOut,
  timing,
  staggerAmount = 3000,
  overflow = false,
  staggerOffset = 0
) => {
  let staggerId = staggerOffset;
  let baseDelay = defaultDelayTime();
  let totalTime = defaultTotalTime() - baseDelay;
  let duration = baseDelay;

  if (typeof timing === "object") {
    console.log("Timing is object!! delay before: ", baseDelay);
    baseDelay = timing.delay || baseDelay;
    duration = timing.duration;
    totalTime = timing.total - baseDelay || totalTime;
    console.log("   Timing is object!! after ", baseDelay, duration, totalTime);
  }

  return () => {
    const _staggerAmount = Math.min(
      staggerAmount,
      (totalTime - baseDelay) / participants
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
