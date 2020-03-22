import React, { useRef, useEffect, useState } from "react";
import { SEARCH_POKEMON } from "store/actions/types";

import clsx from "clsx";
import Color from "color";

import SearchInput from "./components/SearchInput";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import SplitText from "react-pose-text";
import SmoothIn from "util/transitionSmoothIn";

import Box from "@material-ui/core/Box";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => {
  const trsn = theme.transitions;
  const ease = trsn.easing;
  const pokeShortTrsn = [
    trsn.duration.short,
    trsn.duration.short,
    ease.pokeEase
  ];

  const pokeDelayTrsn = [
    trsn.duration.medium,
    trsn.duration.medium,
    ease.pokeEase
  ];
  return {
    card: {
      ...trsn.build([
        [
          "background-color",
          trsn.duration.long * 3,
          trsn.duration.long * 2,
          ease.pokeEase
        ],
        ["margin-left", ...pokeShortTrsn],
        ["margin-right", ...pokeShortTrsn]
      ]),
      backgroundColor: Color(theme.palette.secondary.main)
        .mix(Color(theme.palette.background.default), 0.15)
        .toString(),
      marginLeft: "24%",
      marginRight: "24%"
    },
    cardOpen: {
      backgroundColor: theme.palette.background.default,
      ...trsn.build([
        ["background-color", 650, 0, ease.pokeEase],
        ["margin-left", ...pokeDelayTrsn],
        ["margin-right", ...pokeDelayTrsn]
      ]),
      marginLeft: "10%",
      marginRight: "10%"
    },
    cardBusy: {
      backgroundColor: theme.palette.background.senary,
      marginLeft: "15%",
      marginRight: "15%"
    },
    cardActionArea: {
      padding: "0.8em",
      paddingBottom: "2.25em"
    },
    touchRippleColor: {
      color: theme.palette.background.default,
      opacity: 1
    },
    cardActionAreaOverlay: {
      opacity: "0% !important"
    },
    cardHeader: {
      ...trsn.build([
        ["margin-top", ...pokeDelayTrsn],
        ["margin-bottom", ...pokeDelayTrsn],
        ["transform", 825, 425, ease.pokeSwish]
      ]),
      textAlign: "center",
      marginBottom: "-2.25em",
      marginTop: "1.5em",
      transform: "scale(1.1,1.1)"
    },
    "cardHeader-Open": {
      ...trsn.build([
        ["margin", ...pokeShortTrsn],
        ["transform", 425, 0, trsn.easing.bounceClick]
      ]),
      marginTop: "2.5em",
      marginBottom: "5em",
      transform: "scale(1,1)"
    },
    cardSubheaderText: {
      transition: "none",
      fontWeight: "bold",
      opacity: "1"
    },
    cardSubheaderTextInactive: {
      transition: "opacity 250ms linear",
      opacity: "0"
    },
    cardSubheaderIcon: {
      transition: "opacity 625ms linear 1.3s",
      opacity: "1"
    },
    cardSubheaderIconInactive: {
      transition: "opacity 250ms linear",
      opacity: "0"
    },
    cardContent: {
      ...trsn.build([["margin-bottom", ...pokeDelayTrsn]]),
      display: "flex",
      padding: "0px",
      justifyContent: "center",
      marginBottom: "0.75em"
    },
    "cardContent-Open": {
      ...trsn.build([["margin-bottom", ...pokeShortTrsn]]),
      marginBottom: "2.5em"
    },
    "cardContent-Busy": {
      marginBottom: "1.125em"
    },
    inlineIcon: {
      verticalAlign: "text-top"
    }
  };
});

const subheadingCharPoses = {
  exit: { opacity: 0, y: 10, delay: 625 },
  enter: {
    y: 0,
    opacity: 1,
    transition: ({ charIndex, numChars }) => ({
      type: "spring",
      delay: 800 + (charIndex / numChars) * 625,
      stiffness: 5000 - 250 * Math.pow(charIndex / numChars, 0.5),
      damping: 1000
    })
  }
};

const loadingStrings = {
  [SEARCH_POKEMON.NONE]: "947 Available", //TODO: make dynamic
  [SEARCH_POKEMON.INIT]: "Initialised...",
  [SEARCH_POKEMON.FOUND]: "Pokemon found...",
  [SEARCH_POKEMON.SPECIES_FOUND]: "Pokemon species found...",
  [SEARCH_POKEMON.MOVES_FOUND]: "Pokemon moves found...",
  [SEARCH_POKEMON.DONE]: "Search complete!",
  [SEARCH_POKEMON.FAILED]: "Error. Pokemon not found."
};

const ErrorProgress = props => {
  const [errorCooldown, setErrorCooldown] = React.useState(100);
  const interval = 85;
  const delta =
    (interval / Number(process.env.REACT_APP_APIERRORCOOLDOWN * 0.8)) * 100;

  React.useEffect(() => {
    function progress() {
      setErrorCooldown(prevCooldown =>
        prevCooldown <= 0 ? 0 : prevCooldown - delta
      );
    }

    const timer = setInterval(progress, interval);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgress
      size="0.8rem"
      variant="static"
      value={errorCooldown}
      thickness={18}
      style={{
        verticalAlign: "text-top",
        marginRight: "0.375rem",
        marginTop: "0.01rem",
        color: props.color
      }}
    />
  );
};

const HelperText = ({ searching, loadingState, mainTheme: theme }) => (
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
    {loadingState === SEARCH_POKEMON.FAILED && (
      <ErrorProgress color={theme.palette.error.main} />
    )}
    <span>{loadingStrings[loadingState]}</span>
  </>
);
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
    //focusTimer.current = setTimeout(() => handleClick(), 1500);
  };

  useEffect(() => setSearching(!searchReady), [searchReady]);
  const panelOpen = isFocused && searchReady;

  const mainAnim = anim();

  return (
    <div style={{ ...props.style, ...mainAnim }}>
      <Card
        elevation={3}
        className={clsx(
          classes.card,
          isFocused && (searchReady ? classes.cardOpen : classes.cardBusy)
        )}
      >
        <CardActionArea
          TouchRippleProps={{
            classes: {
              rippleVisible: clsx(!panelOpen && classes.touchRippleColor)
            }
          }}
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
              root: clsx(
                classes.cardHeader,
                isFocused && classes["cardHeader-Open"]
              ),
              subheader: clsx()
              //classes.cardSubheader,
              //!panelOpen && classes.cardSubheaderInactive
            }}
            title={
              <img
                style={{
                  height: "2em",
                  margin: "10px"
                }}
                //src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                src={require("icons/PokeApi.png")}
                alt="Pokemon Dex Logo"
              />
            }
            subheader={
              <Box>
                <span
                  className={clsx(
                    classes.cardSubheaderText,
                    !panelOpen && classes.cardSubheaderTextInactive
                  )}
                >
                  <SplitText
                    charPoses={subheadingCharPoses}
                    initialPose={"exit"}
                    pose={panelOpen ? "enter" : "exit"}
                  >
                    Search Pokémon
                  </SplitText>
                </span>{" "}
                <span
                  className={clsx(
                    classes.inlineIcon,
                    classes.cardSubheaderIcon,
                    !panelOpen && classes.cardSubheaderIconInactive
                  )}
                >
                  <SearchIcon fontSize="small" />
                </span>
              </Box>
            }
          />
          <CardContent
            className={clsx(
              classes.cardContent,
              classes[
                "cardContent-" +
                  (isFocused ? (searchReady ? "Open" : "Busy") : "Closed")
              ]
            )}
          >
            <SearchInput
              {...{
                searchTxtRef,
                searching,
                panelOpen,
                handleFocus,
                handleUnfocus,
                searchPokemon,
                error: loadingState === SEARCH_POKEMON.FAILED
              }}
              helperText={
                <HelperText {...{ searching, loadingState, mainTheme }} />
              }
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default SmoothIn(SearchPanel);
