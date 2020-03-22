import React from "react";

import { Transition } from "react-transition-group";

const baseStyle = ({ duration, magnitude, doHeight }) => ({
  transition:
    `opacity ${duration}ms linear, transform ${duration}ms cubic-bezier(0.075, 0.82, 0.165, 1)` +
    (doHeight
      ? `, max-height ${duration * 2}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
      : ``),
  transitionDelay: duration + "ms",
  opacity: 0,
  transform: "translate(0,-" + 2 * magnitude + "em)"
});

const stateStyles = (duration, doHeight) => ({
  entering: {
    opacity: 1,
    transform: "translate(0,0)",
    maxHeight: doHeight ? "100%" : undefined
  },
  entered: {
    opacity: 1,
    transform: "translate(0,0)",
    maxHeight: doHeight ? "100%" : undefined
  },
  exiting: {
    opacity: 0,
    transform: "translate(0,-1em)",
    maxHeight: doHeight ? "0%" : undefined,
    transition:
      `opacity ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), transform ${duration}ms cubic-bezier(0.075, 0.82, 0.165, 1)` +
      (doHeight
        ? `, max-height ${duration * 2}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
        : "")
  },
  exited: { opacity: 0, transform: "translate(0,-1em)", maxHeight: "0%" }
});

const transitionStyles = (state, duration, magnitude, doHeight) => ({
  ...baseStyle({ duration, magnitude, doHeight }),
  ...stateStyles(duration, doHeight)[state]
});

const SmoothIn = ComponentToTransition => props => (
  <Transition in={props.show} appear timeout={props.delay.dyn}>
    {state => (
      <ComponentToTransition
        {...props}
        style={{
          ...props.style,
          ...transitionStyles(
            state,
            props.delay.dyn,
            props.animMagnitude,
            props.doHeight
          )
        }}
      />
    )}
  </Transition>
);

export default SmoothIn;
