import React, { useRef, useEffect, useState } from "react";
import { SEARCH_POKEMON } from "store/actions/types";

import SearchInput from "./components/SearchInput";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import SmoothIn from "util/transitionSmoothIn";

import Box from "@material-ui/core/Box";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  card: {
    width: "90%"
  },
  cardActionArea: {
    padding: "0.8em",
    paddingBottom: "2.25em"
  },
  cardActionAreaOverlay: {
    opacity: "0% !important"
  },
  cardHeader: {
    textAlign: "center"
  },
  cardSubheader: {
    fontWeight: "bold"
  },
  cardContent: {
    marginTop: "1em",
    display: "flex",
    justifyContent: "center"
  },
  inlineIcon: {
    verticalAlign: "text-top"
  }
}));

const loadingStrings = {
  [SEARCH_POKEMON.NONE]: "974 available",
  [SEARCH_POKEMON.INIT]: "Initialised...",
  [SEARCH_POKEMON.FOUND]: "Pokemon found...",
  [SEARCH_POKEMON.SPECIES_FOUND]: "Pokemon species found...",
  [SEARCH_POKEMON.MOVES_FOUND]: "Pokemon moves found...",
  [SEARCH_POKEMON.DONE]: "Search complete!",
  [SEARCH_POKEMON.FAILED]: "Error. Pokemon not found."
};

const HelperText = ({ searching, loadingState, mainTheme: theme }) => {
  return (
    <>
      {searching && loadingState !== SEARCH_POKEMON.FAILED && (
        <CircularProgress
          size="0.8rem"
          style={{
            verticalAlign: "text-top",
            marginRight: "0.375rem",
            marginTop: "0.01rem",
            color: theme.palette.text.disabled
          }}
        />
      )}
      <span>{loadingStrings[loadingState]}</span>
    </>
  );
};

const SearchPanel = ({
  anim,
  searchReady,
  loadingState,
  searchPokemon,
  ...props
}) => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);
  const searchTxtRef = useRef();
  const [searching, setSearching] = useState(!searchReady);
  const [isFocused, setIsFocused] = useState(false);

  const focusTimer = useRef();

  const handleClick = () =>
    searchTxtRef.current && searchTxtRef.current.focus();

  useEffect(() => {
    focusTimer.current = setTimeout(() => handleClick(), 1500);
    return () => clearTimeout(focusTimer);
  }, []);

  const handleFocus = () => setIsFocused(true);

  const handleUnfocus = () => {
    setIsFocused(false);
    clearTimeout(focusTimer.current);
    focusTimer.current = setTimeout(() => handleClick(), 1500);
  };

  useEffect(() => setSearching(!searchReady), [searchReady]);

  const mainAnim = anim();

  return (
    <Card style={{ ...props.style, ...mainAnim }} className={classes.card}>
      <CardActionArea
        component="div"
        onMouseDown={e => {
          e.stopPropagation();
          e.preventDefault();
          handleClick();
        }}
        classes={{
          root: classes.cardActionArea,
          focusHighlight: classes.cardActionAreaOverlay
        }}
      >
        <CardHeader
          classes={{
            root: classes.cardHeader,
            subheader: classes.cardSubheader
          }}
          title={
            <img
              style={{
                height: "2em",
                margin: "10px"
              }}
              src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
              alt="Pokemon Dex Logo"
            />
          }
          subheader={
            <Box>
              Search Pokémon{" "}
              <SearchIcon fontSize="small" className={classes.inlineIcon} />
            </Box>
          }
        />
        {/* <Box>{searching && loadingState}</Box> */}
        <CardContent className={classes.cardContent}>
          <SearchInput
            {...{
              searchTxtRef,
              searching,
              isFocused,
              handleFocus,
              handleUnfocus,
              searchPokemon
            }}
            helperText={
              <HelperText {...{ searching, loadingState, mainTheme }} />
            }
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SmoothIn(SearchPanel);
