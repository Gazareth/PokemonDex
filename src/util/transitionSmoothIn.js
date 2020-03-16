import React from "react";

import { Transition } from "react-transition-group";

const baseStyle = (duration, magnitude = 1) => ({
  transition: `opacity ${duration}ms linear, transform ${duration}ms cubic-bezier(0.075, 0.82, 0.165, 1)`,
  transitionDelay: duration + "ms",
  opacity: 0,
  transform: "translate(0,-" + 2 * magnitude + "em)"
});

const stateStyles = duration => ({
  entering: { opacity: 1, transform: "translate(0,0)" },
  entered: { opacity: 1, transform: "translate(0,0)" },
  exiting: {
    opacity: 0,
    transform: "translate(0,-1em)",
    transition: `opacity ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), transform ${duration}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
  },
  exited: { opacity: 0, transform: "translate(0,-1em)" }
});

const transitionStyles = (state, duration, magnitude) => ({
  ...baseStyle(duration, magnitude),
  ...stateStyles(duration)[state]
});

const SmoothIn = ComponentToTransition => props => (
  <Transition in={props.show} appear timeout={props.delay.dyn}>
    {state => (
      <ComponentToTransition
        {...props}
        style={{
          ...props.style,
          ...transitionStyles(state, props.delay.dyn, props.animMagnitude)
        }}
      />
    )}
  </Transition>
);

export default SmoothIn;
