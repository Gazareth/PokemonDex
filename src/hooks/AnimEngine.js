const defaultDelayTime = () =>
  parseInt(process.env.REACT_APP_SWITCHSCREENINITIALPAUSE);

const defaultTotalTime = () =>
  parseInt(process.env.REACT_APP_SWITCHSCREENDELAY);

const noop = () => {};

const useAnimEngine = (
  participants,
  inOut,
  timing,
  staggerAmount = 3000,
  overflow = false,
  staggerOffset = 0,
  providedCallback = noop
) => {
  let staggerId = staggerOffset;
  let baseDelay = defaultDelayTime();
  let totalTime = defaultTotalTime() - baseDelay;
  let duration = baseDelay;

  if (typeof timing === "object") {
    baseDelay = timing.delay || baseDelay;
    duration = timing.duration || baseDelay;
    totalTime = timing.total - baseDelay || totalTime;
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
      ...(staggerId === participants ? { providedCallback } : {}), //pass callback for onEntered for last participant
    };
  };
};

export default useAnimEngine;
