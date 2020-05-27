import React from "react";

import { Transition } from "react-transition-group";

const baseStyle = ({ duration, magnitude, doHeight }) => ({
  transition:
    `opacity ${duration.in}ms linear, transform ${duration.in}ms cubic-bezier(0.075, 0.82, 0.165, 1)` +
    (doHeight
      ? `, max-height ${duration.in}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
      : ``),
  transitionDelay: duration.in + "ms",
  opacity: 0,
  transform: "translate(0,-" + 2 * magnitude + "em)",
  //maxHeight: doHeight ? "100%" : undefined,
  maxHeight: "100%",
});

const stateStyles = (duration, doHeight) => ({
  entering: {
    opacity: 1,
    transform: "translate(0,0)",
    maxHeight: "100%",
  },
  entered: {
    opacity: 1,
    transform: "translate(0,0)",
    maxHeight: "100%",
  },
  exiting: {
    transition:
      `opacity ${duration.out}ms linear ${duration.out}ms, transform ${duration.out}ms cubic-bezier(0.075, 0.82, 0.165, 1) ${duration.out}ms` +
      (doHeight
        ? `, max-height ${duration.out *
            2}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
        : ``),
    transitionDelay: `${duration.out}ms`,
    opacity: 0,
    transform: "translate(0,-1em)",
    maxHeight: doHeight ? "0%" : undefined,
  },
  exited: {
    opacity: 0,
    transform: "translate(0,-1em)",
    maxHeight: doHeight ? "0%" : undefined,
  },
});

const transitionStyles = (state, duration, magnitude, doHeight) => ({
  ...baseStyle({ duration, magnitude, doHeight }),
  ...stateStyles(duration, doHeight)[state],
});

const SmoothIn = (ComponentToTransition) => ({
  show,
  delay,
  animMagnitude,
  doHeight,
  ...otherProps
}) => (
  <Transition in={show} appear timeout={delay.dyn}>
    {(state) => (
      <ComponentToTransition
        {...otherProps}
        style={{
          ...otherProps.style,
          ...transitionStyles(state, delay, animMagnitude, doHeight),
        }}
      />
    )}
  </Transition>
);

export default SmoothIn;
