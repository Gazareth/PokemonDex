//Courtesy of https://github.com/mui-org/material-ui/issues/14789
import React from "react";

import SmoothIn from "Utils/transitionSmoothIn";
import pick from "Utils/pick";

import TextField from "@material-ui/core/TextField";

const InputComponent = ({ inputRef, ...other }) => <div {...other} />;

const OutlinedDiv = ({
  children,
  inputClassName,
  inputRootClasses,
  ...props
}) => (
  <TextField
    {...pick(props, ["label", "style", "className", "classes"])}
    variant="outlined"
    fullWidth
    multiline
    InputLabelProps={{ shrink: true }}
    InputProps={{
      classes: { root: inputRootClasses },
      inputComponent: InputComponent,
    }}
    inputProps={{
      className: inputClassName,
      children: children,
    }}
  />
);

export default SmoothIn(OutlinedDiv);
