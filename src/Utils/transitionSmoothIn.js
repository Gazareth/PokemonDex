import React from "react";

import { CSSTransition } from "react-transition-group";

/************************
 * SMOOTH
 ***********************/
const smoothBaseStyle = ({ delay, magnitude, doHeight }) => ({
  transition:
    `opacity ${delay.in}ms linear, transform ${delay.in}ms cubic-bezier(0.075, 0.82, 0.165, 1)` +
    (doHeight
      ? `, max-height ${delay.in}ms cubic-bezier(0.075, 0.82, 0.165, 1)`
      : ``),
  transitionDelay: `${delay.in}ms`,
  opacity: 0,
  transform: `translate(0,${-2 * magnitude} em)`,
});

const smoothStateStyles = ({ delay, doHeight }) => ({
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
      `opacity ${delay.outDuration}ms linear ${delay.out}ms, transform ${
        delay.out * 2
      }ms cubic-bezier(0.075, 0.82, 0.165, 1) ${delay.out * 0.75}ms` +
      (doHeight
        ? `, max-height ${
            delay.outDuration * 2
          }ms cubic-bezier(0.075, 0.82, 0.165, 1) ${delay.out * 0.75}ms`
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

/************************
 * BOUNCE
 ***********************/
const bounceBaseStyle = ({ delay, theme }) => ({
  transitionProperty: "transform",
  transitionDuration: `${delay.inDuration}ms`,
  transitionTimingFunction: theme.transitions.easing.pokeBounceIn,
  transitionDelay: `${delay.in}ms`,
  transform: "scale(0)",
});

const bounceStateStyles = ({ delay, theme }) => ({
  entering: { transform: "scale(1)" },
  entered: { transform: "scale(1)" },
  exiting: {
    transform: "scale(0)",
    transitionDuration: `${delay.outDuration}ms`,
    transitionTimingFunction: theme.transitions.easing.pokeBounceOut,
    transitionDelay: `${delay.out}ms`,
  },
  exited: {
    transform: "scale(0)",
    transitionTimingFunction: theme.transitions.easing.pokeBounceOut,
  },
});

/************************
 * SELECTORS
 ***********************/
const baseStyles = {
  Smooth: smoothBaseStyle,
  Bounce: bounceBaseStyle,
};

const stateStyles = {
  Smooth: smoothStateStyles,
  Bounce: bounceStateStyles,
};

/************************
 * COMPONENT (HOC)
 ***********************/
const transitionStyles = (
  state,
  delay,
  transitionType = "Smooth",
  magnitude = 1,
  doHeight = false,
  theme = {}
) => ({
  ...baseStyles[transitionType]({ delay, magnitude, doHeight, theme }),
  ...stateStyles[transitionType]({ delay, doHeight, theme })[state],
});

const SmoothIn = (ComponentToTransition) => ({
  show,
  delay,
  animMagnitude,
  doHeight,
  transitionType,
  theme,
  ...otherProps
}) => (
  <CSSTransition
    in={show}
    appear={true}
    timeout={show ? delay.in : delay.outDuration}
  >
    {(state) => (
      <ComponentToTransition
        {...otherProps}
        style={{
          ...otherProps.style,
          ...transitionStyles(
            state,
            delay,
            transitionType,
            animMagnitude,
            doHeight,
            theme
          ),
        }}
      />
    )}
  </CSSTransition>
);

export default SmoothIn;
