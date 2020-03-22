import React, { useState } from "react";

import clsx from "clsx";
import Color from "color";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles(theme => ({
  searchWidth: {
    maxWidth: "70%",
    transition:
      "filter 275ms cubic-bezier(0.215, 0.61, 0.355, 1), max-width 275ms cubic-bezier(0.215, 0.61, 0.355, 1)",
    //overflow: "hidden"
    filter: "none"
  },
  searchWidthInactive: {
    maxWidth: "65%",
    filter: "opacity(100%)"
  },
  searchInputLabelBold: {
    fontWeight: "bold"
  },
  inputAdornIcon: {
    transition: "color 375ms linear"
  },
  inputAdornIconDelay: {
    transitionDelay: "375ms"
  }
}));

const InputAdornState = (searching, isFocused, searchString) =>
  isFocused
    ? searchString.length > 2
      ? 3
      : Math.max(searchString.length, 1)
    : searching === true
    ? 4
    : 0;

const inputAdornOpacity = [0, 0.25, 0.35, 0.45];
const inputAdornIcon = [
  FiberManualRecordOutlinedIcon,
  FiberManualRecordOutlinedIcon,
  FiberManualRecordTwoToneIcon,
  FiberManualRecordIcon,
  CancelIcon
];

const InputIcon = ({ inputAdornState: state }) => {
  const Icon = inputAdornIcon[state];
  return <Icon style={{ fontSize: "1.25rem" }} />;
};

const handleChange = (e, f) => {
  f(e.target.value);
};

const handleKeyDown = (e, f) => {
  if (e.keyCode === 13) {
    f();
  }
};

const SearchInput = ({
  searchTxtRef,
  searching,
  isFocused,
  handleFocus,
  handleUnfocus,
  searchPokemon,
  error,
  helperText,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [searchString, setSearchString] = useState("");

  const inputAdornState = InputAdornState(searching, isFocused, searchString);

  const parseSearchString = str => setSearchString(str.toLowerCase());
  const clearSearchString = () => {
    searchTxtRef.current.value = "";
    setSearchString("");
  };

  const sendSearch = () => {
    searchPokemon(searchString);
  };

  return (
    <FormControl
      classes={{
        root: clsx(
          classes.searchWidth,
          !isFocused && classes.searchWidthInactive
        )
      }}
      //variant="filled"
      disabled={searching}
    >
      <InputLabel
        htmlFor="filled-adornment-search"
        //disabled={!isFocused}
        classes={{ root: clsx(!isFocused && classes.searchInputLabelBold) }}
      >
        {isFocused
          ? "Name or ID #"
          : searching
          ? "Searching for: "
          : "Enter Name or ID #"}
      </InputLabel>
      <Input
        id="filled-adornment-search"
        error={error}
        onFocus={() => handleFocus()}
        onBlur={() => handleUnfocus()}
        onChange={e => handleChange(e, parseSearchString)}
        onKeyDown={e => handleKeyDown(e, sendSearch)}
        inputProps={{ ref: searchTxtRef }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={searching ? "Cancel Search" : "Clear Search"}
              onClick={clearSearchString}
              disabled={searchString.length === 0}
              className={clsx(
                classes.inputAdornIcon,
                [1, 2].includes(inputAdornState) && classes.inputAdornIconDelay
              )}
              style={{
                color: Color(theme.palette.text.primary)
                  .fade(1 - inputAdornOpacity[inputAdornState])
                  .toString()
              }}
              edge="end"
            >
              <InputIcon
                {...{
                  inputAdornState
                }}
              />
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText component="div" id="filled-adornment-search-helper-text">
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default SearchInput;
