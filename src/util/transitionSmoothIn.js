import React from "react";

import { Transition } from "react-transition-group";

const baseStyle = ({ delay, magnitude, doHeight }) => ({
  transition:
    `opacity ${delay.in}ms linear, transform ${delay.in}ms cubic-bezier(0.075, 0.82, 0.165, 1)` +
    (doHeight
      ? `, max-height ${delay.in}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
      : ``),
  transitionDelay: delay.in + "ms",
  opacity: 0,
  transform: "translate(0,-" + 2 * magnitude + "em)",
  //maxHeight: doHeight ? "100%" : undefined,
  //maxHeight: doHeight ? "100%" : undefined,
});

const stateStyles = (delay, doHeight) => ({
  entering: {
    opacity: 1,
    transform: "translate(0,0)",
    maxHeight: doHeight ? "100%" : undefined,
  },
  entered: {
    opacity: 1,
    transform: "translate(0,0)",
    maxHeight: doHeight ? "100%" : undefined,
  },
  exiting: {
    transition:
      `opacity ${delay.out}ms linear ${
        delay.out
      }ms, transform ${delay.outDuration *
        2}ms cubic-bezier(0.075, 0.82, 0.165, 1) ${delay.out * 0.75}ms` +
      (doHeight
        ? `, max-height ${delay.outDuration *
            2}ms cubic-bezier(0.075, 0.82, 0.165, 1) ${delay.out * 0.75}ms`
        : ``),
    transitionDelay: `${delay.out * 0.75}ms`,
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

const transitionStyles = (state, delay, magnitude, doHeight) => ({
  ...baseStyle({ delay, magnitude, doHeight }),
  ...stateStyles(delay, doHeight)[state],
});

const SmoothIn = (ComponentToTransition) => ({
  show,
  delay,
  animMagnitude,
  doHeight,
  ...otherProps
}) => (
  <Transition in={show} appear timeout={show ? delay.in : delay.outDuration}>
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
