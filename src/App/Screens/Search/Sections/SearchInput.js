import React, { useState } from "react";

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
    //overflow: "hidden"
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
  searching,
  isFocused,
  handleFocus,
  handleUnfocus,
  searchPokemon,
  error,
  helperText,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [searchString, setSearchString] = useState("");

  const parseSearchString = (str) => setSearchString(str.toLowerCase());

  const sendSearch = () => {
    searchPokemon(searchString);
  };

  return (
    <FormControl
      classes={{
        root: clsx(
          classes.searchWidth,
          !isFocused && classes.searchWidthInactive
        ),
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
        onChange={(e) => handleChange(e, parseSearchString)}
        onKeyDown={(e) => handleKeyDown(e, sendSearch)}
        inputProps={{ ref: searchTxtRef }}
      />
      <FormHelperText component="div" id="filled-adornment-search-helper-text">
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default SearchInput;
