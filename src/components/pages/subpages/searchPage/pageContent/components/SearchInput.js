import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
//import SmoothIn from "util/transitionSmoothIn";

import { Grow } from "@material-ui/core";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";

//import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import CancelIcon from "@material-ui/icons/Cancel";
import { theme } from "theme";
import Color from "color";

const useStyles = makeStyles(theme => ({
  searchWidth: {
    width: "65%"
  }
}));

const InputIcon = ({ searching, isFocused, searchString, ...props }) => {
  let icon = <FiberManualRecordOutlinedIcon />;
  //icon = <FiberManualRecordIcon />;
  if (searching) {
    icon = <CancelIcon />;
  } else {
    if (searchString.length > 1) {
      icon = <FiberManualRecordTwoToneIcon />;
    } else {
      icon = <FiberManualRecordOutlinedIcon />;
    }
  }
  return (
    <Grow
      in={searchString > 0}
      {...props}
      style={{ ...props.style, fontSize: "1.3rem" }}
    >
      {icon}
    </Grow>
  );
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
  helperText,
  ...props
}) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");

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
      classes={{ root: classes.searchWidth }}
      //variant="filled"
      disabled={searching}
    >
      <InputLabel htmlFor="filled-adornment-search">
        {searching ? "Searching..." : "Name or ID#"}
      </InputLabel>
      <Input
        id="filled-adornment-search"
        onFocus={() => handleFocus()}
        onBlur={() => handleUnfocus()}
        onChange={e => handleChange(e, parseSearchString)}
        onKeyDown={e => handleKeyDown(e, sendSearch)}
        inputProps={{ ref: searchTxtRef }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={searching ? "cancel search" : "search pokemon"}
              onClick={clearSearchString}
              disabled={searchString.length === 0}
              edge="end"
            >
              <InputIcon
                style={{
                  color: Color(theme.palette.text.primary).fade(
                    searchString.length > 1 ? 0.6 : 0.75
                  )
                }}
                {...{
                  searching,
                  isFocused,
                  searchString
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
