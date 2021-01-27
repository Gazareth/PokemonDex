import isEmpty from "lodash/isEmpty";
import noop from "lodash/noop";

const defaultDelayTime = () =>
  parseInt(process.env.REACT_APP_SWITCHSCREENINITIALPAUSE);

const defaultTotalTime = () =>
  parseInt(process.env.REACT_APP_SWITCHSCREENDELAY);

const useAnimEngine = (
  participants,
  inOut,
  timing,
  staggerAmount = 300,
  overflow = 0,
  staggerOffset = 0,
  providedCallback = noop
) => {
  let staggerId = staggerOffset;
  let baseDelay = defaultDelayTime();
  let totalTime = defaultTotalTime() - baseDelay; // this is in use, just ESLint being rarted
  let baseDuration = defaultDelayTime() * 3;

  if (typeof timing === "object" && !isEmpty(timing)) {
    baseDelay = timing.delay || baseDelay;
    baseDuration = timing.duration || baseDuration;
    totalTime = !!timing.total
      ? timing.total - baseDelay ||
        (baseDuration + staggerAmount) * participants + baseDelay
      : totalTime;
    console.log(
      "baseDelay",
      baseDelay,
      "duration",
      baseDuration,
      timing.duration
    );
  }

  return () => {
    // const _staggerAmount = Math.min(
    //   staggerAmount,
    //   (totalTime - baseDelay) / participants
    // );
    const newDuration =
      baseDuration + staggerAmount * Math.pow(staggerId, overflow);
    const invDuration =
      staggerAmount * Math.pow(participants - staggerId, overflow);
    const newDelay = baseDelay + (staggerAmount + staggerOffset) * staggerId++;
    const maxDelay = baseDelay + staggerAmount * participants;
    const invDelay = maxDelay - newDelay;

    return {
      delay: {
        in: newDelay,
        out: invDelay,
        inDuration: overflow ? newDuration : baseDuration,
        outDuration: overflow ? invDuration : baseDuration,
        maxDelay,
      },
      show: inOut,
      ...(staggerId === participants ? { providedCallback } : {}), //pass callback for onEntered for last participant
    };
  };
};

export default useAnimEngine;
