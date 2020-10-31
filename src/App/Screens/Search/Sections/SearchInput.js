import React, { useState, useMemo } from "react";

import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  searchWidth: {
    maxWidth: "70%",
    transition:
      "filter 275ms cubic-bezier(0.215, 0.61, 0.355, 1), max-width 275ms cubic-bezier(0.215, 0.61, 0.355, 1)",
    filter: "none",
  },
  searchWidthInactive: {
    maxWidth: "65%",
    filter: "opacity(100%)",
  },
  searchInputLabelBold: {
    fontWeight: "bold",
  },
  inputAdornIcon: {
    transition: "color 375ms linear",
  },
  inputAdornIconDelay: {
    transitionDelay: "375ms",
  },
}));

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
  isSearching,
  isBusy,
  isFocused,
  isError,
  handleFocus,
  handleUnfocus,
  searchPokemon,
  helperText,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [searchString, setSearchString] = useState("");

  const parseSearchString = (str) => setSearchString(str.toLowerCase());

  const sendSearch = () => {
    document.activeElement.blur();
    searchPokemon(searchString);
  };

  const labelText = useMemo(
    () =>
      isSearching
        ? "Searching for: "
        : isBusy
        ? isError
          ? ""
          : "Loading..."
        : isFocused
        ? "Name or ID #"
        : "Enter Name or ID #",
    [isBusy, isError, isFocused, isSearching]
  );

  return (
    <FormControl
      classes={{
        root: clsx(
          classes.searchWidth,
          !isFocused && classes.searchWidthInactive
        ),
      }}
      disabled={isBusy}
    >
      <InputLabel
        htmlFor="filled-adornment-search"
        //disabled={!isFocused}
        classes={{ root: clsx(!isFocused && classes.searchInputLabelBold) }}
      >
        {labelText}
      </InputLabel>
      <Input
        id="filled-adornment-search"
        error={isError}
        onFocus={() => handleFocus()}
        onBlur={() => handleUnfocus()}
        onChange={(e) => handleChange(e, parseSearchString)}
        onKeyDown={(e) => handleKeyDown(e, sendSearch)}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        inputProps={{ ref: searchTxtRef, type: "search", autoComplete: "off" }}
      />
      <FormHelperText component="div" id="filled-adornment-search-helper-text">
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default SearchInput;
