//Courtesy of https://github.com/mui-org/material-ui/issues/14789
import React from "react";

import SmoothIn from "util/transitionSmoothIn";
import { filterObject } from "util/filterObject";

import TextField from "@material-ui/core/TextField";

const InputComponent = ({ inputRef, ...other }) => <div {...other} />;

const OutlinedDiv = ({
  children,
  inputClassName,
  inputRootClasses,
  ...props
}) => (
  <TextField
    {...filterObject(props, ["label", "style", "className", "classes"])}
    variant="outlined"
    fullWidth
    multiline
    InputLabelProps={{ shrink: true }}
    InputProps={{
      classes: { root: inputRootClasses },
      inputComponent: InputComponent
    }}
    inputProps={{
      className: inputClassName,
      children: children
    }}
  />
);

export default SmoothIn(OutlinedDiv);
