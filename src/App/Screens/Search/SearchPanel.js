import React, { useRef, useState, useMemo, useCallback } from "react";

import AnimatedNumber from "react-animated-number";

import clsx from "clsx";
import Color from "color";

import SearchInput from "./Sections/SearchInput";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import SplitText from "react-pose-text";
import SmoothIn from "Utils/transitionSmoothIn";

import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";

import { PRESEARCH_POKEMON, SEARCH_POKEMON } from "Store/actions/types";
import {
  LOADING_STRINGS as loadingStrings,
  PRELOAD_STRINGS as preloadStrings,
} from "Constants";

const useStyles = makeStyles((theme) => {
  const trsn = theme.transitions;
  const ease = trsn.easing;
  const pokeBounceIn = [
    trsn.duration.long,
    trsn.duration.short,
    ease.pokeBounceIn,
  ];

  const pokeBounceOut = [
    trsn.duration.longer,
    trsn.duration.short,
    ease.pokeBounceOut,
  ];
  return {
    /* CARD META */
    cardActionArea: {
      padding: "0.8em",
      paddingBottom: "2.25em",
    },
    touchRippleColor: {
      color: theme.palette.background.default,
      opacity: 1,
    },
    cardActionAreaOverlay: {
      opacity: "0% !important",
    },
    /* CARD */
    card: {
      margin: "0 auto",
      minWidth: "264px",
      maxWidth: "286px",
      ...trsn.build([
        [
          "background-color",
          trsn.duration.long * 3.5,
          trsn.duration.long * 1.25,
          ease.pokeEase,
        ],
        ["max-width", ...pokeBounceOut],
      ]),
      backgroundColor: Color(theme.palette.secondary.main)
        .mix(Color(theme.palette.background.default), 0.15)
        .toString(),
    },
    "card-Open": {
      maxWidth: "328px",
      ...trsn.build([
        ["background-color", 650, 0, ease.pokeEase],
        ["max-width", ...pokeBounceIn],
      ]),
      backgroundColor: theme.palette.background.default,
    },
    "card-Busy": {
      maxWidth: "264px",
      ...trsn.build([
        ["background-color", 650, 0, ease.pokeEase],
        ["max-width", ...pokeBounceOut],
      ]),
      backgroundColor: theme.palette.background.senary,
    },
    /* CARD HEADER */
    cardHeader: {
      ...trsn.build([
        ["margin-top", ...pokeBounceOut],
        ["margin-bottom", ...pokeBounceOut],
        ["transform", 825, 425, ease.pokeSwish],
      ]),
      textAlign: "center",
      marginTop: "1.65em",
      marginBottom: "-1.5em",
      transform: "scale(1.1,1.1)",
    },
    "cardHeader-Open": {
      ...trsn.build([
        ["margin-top", ...pokeBounceIn],
        ["margin-bottom", ...pokeBounceIn],
        ["transform", 425, 0, trsn.easing.bounceClick],
      ]),
      marginTop: "2.5em",
      marginBottom: "5em",
      transform: "scale(1,1)",
    },
    "cardHeader-Busy": {
      marginTop: "1.5em",
      marginBottom: "-0.35em",
    },
    /* CARD SUBHEADER */
    cardSubheaderText: {
      transition: "opacity 250ms linear",
      fontWeight: "bold",
      opacity: "0",
    },
    "cardSubheaderText-Open": {
      transition: "none",
      opacity: "1",
    },
    cardSubheaderIcon: {
      transition: "opacity 250ms linear",
      verticalAlign: "text-top",
      opacity: "0",
    },
    "cardSubheaderIcon-Open": {
      transition: "opacity 625ms linear 1.3s",
      opacity: "1",
    },
    /* CARD CONTENT */
    cardContent: {
      ...trsn.build([["margin-bottom", ...pokeBounceOut]]),
      display: "flex",
      padding: "0px",
      justifyContent: "center",
      marginTop: "0.85em",
      marginBottom: "1.35em",
    },
    "cardContent-Open": {
      ...trsn.build([["margin-bottom", ...pokeBounceIn]]),
      marginBottom: "2.5em",
    },
    "cardContent-Busy": {
      ...trsn.build([["margin-bottom", ...pokeBounceOut]]),
      marginBottom: "1em",
    },
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
      damping: 1000,
    }),
  },
};

const ErrorProgress = ({ color }) => {
  const [errorCooldown, setErrorCooldown] = React.useState(100);
  const interval = 85;
  const delta =
    (interval / Number(process.env.REACT_APP_APIERRORCOOLDOWN * 0.8)) * 100;

  React.useEffect(() => {
    function progress() {
      setErrorCooldown((prevCooldown) =>
        prevCooldown <= 0 ? 0 : prevCooldown - delta
      );
    }

    const timer = setInterval(progress, interval);
    return () => {
      clearInterval(timer);
    };
  }, [delta]);

  return (
    <CircularProgress
      size="0.8rem"
      variant="static"
      value={errorCooldown}
      thickness={24}
      style={{
        verticalAlign: "text-top",
        marginRight: "0.375rem",
        marginTop: "0.01rem",
        color,
      }}
    />
  );
};

const searchIdle = (loadingState) =>
  ![SEARCH_POKEMON.FAILED, SEARCH_POKEMON.DONE].includes(loadingState);

const HelperText = ({
  preSearchState,
  totalPokemon,
  isSearching,
  loadingState,
  mainTheme: theme,
}) => (
  <>
    {isSearching && searchIdle(loadingState) && (
      <CircularProgress
        size="0.8rem"
        style={{
          verticalAlign: "text-top",
          marginRight: "0.375rem",
          marginTop: "0.01rem",
          color: theme.palette.text.disabled,
        }}
      />
    )}
    {loadingState === SEARCH_POKEMON.FAILED && (
      <ErrorProgress color={theme.palette.error.main} />
    )}
    <span>
      {!isSearching && searchIdle(loadingState) ? (
        preSearchState === PRESEARCH_POKEMON.DONE ? (
          <>
            <AnimatedNumber
              value={totalPokemon}
              duration={totalPokemon * 1.5}
              stepPrecision={0}
              frameStyle={(perc) =>
                perc === 100
                  ? {}
                  : {
                      filter: `opacity(${perc}%)`,
                    }
              }
              //formatValue={(n) => `${n}`}
            />{" "}
            <Fade
              in={totalPokemon > 0}
              timeout={totalPokemon * 1.5}
              style={{ transitionDelay: `${totalPokemon * 1.5}ms` }}
            >
              <span>Available</span>
            </Fade>
          </>
        ) : (
          preloadStrings[preSearchState]
        )
      ) : (
        loadingStrings[loadingState]
      )}
    </span>
  </>
);
const SearchPanel = ({
  anim,
  isBusy,
  totalPokemon,
  preSearchState,
  searchingPokemon,
  loadingState,
  searchPokemon,
  currentPokemon,
  ...props
}) => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);
  const searchTxtRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const focusTimer = useRef();

  const handleClick = useCallback(
    () => searchTxtRef.current && searchTxtRef.current.focus(),
    [searchTxtRef]
  );

  const isSearching = (searchingPokemon && searchingPokemon > 0) || null;

  // Handle search complete
  // const inputVal = useMemo(() => {
  //   if (
  //     isBusy &&
  //     ((loadingState === SEARCH_POKEMON.VARIETY_FOUND &&
  //       searchingPokemon === currentPokemon.id) ||
  //       (!isSearching && loadingState !== SEARCH_POKEMON.FAILED))
  //   ) {
  //     return currentPokemon.name;
  //   } else {
  //     return null;
  //   }
  // }, [currentPokemon, loadingState, isBusy, isSearching, searchingPokemon]);

  // Auto focus on mount after delay
  // useEffect(() => {
  //   focusTimer.current = setTimeout(() => handleClick(), 1500);
  //   return () => clearTimeout(focusTimer);
  // }, [handleClick]);

  const handleFocus = () => setIsFocused(true);

  const handleUnfocus = useCallback(() => {
    setIsFocused(false);
    clearTimeout(focusTimer.current);
    //focusTimer.current = setTimeout(() => handleClick(), 1500); //REPEATEDLY REASSIGN FOCUS
  }, []);

  const panelOpen = isFocused && !isBusy;

  const mainAnim = anim();

  const cardStates = ["Closed", "Open", "Busy"];
  const cardState = isBusy ? 2 : isFocused ? 1 : 0;
  const stateClass = (prefix) =>
    clsx(classes[prefix], classes[prefix + "-" + cardStates[cardState]]);

  const touchRippleClasses = useMemo(
    () => clsx({ [classes.touchRippleColor]: !panelOpen }),
    [panelOpen, classes]
  );

  return (
    <div style={{ ...props.style, ...mainAnim }}>
      <Card elevation={3} className={stateClass("card")}>
        <CardActionArea
          TouchRippleProps={{
            classes: {
              rippleVisible: touchRippleClasses,
            },
          }}
          //component="CardActionArea"
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleClick();
          }}
          classes={{
            root: clsx(classes.cardActionArea),
            focusHighlight: classes.cardActionAreaOverlay,
          }}
        >
          <CardHeader
            classes={{
              root: clsx(classes.cardHeader, stateClass("cardHeader")),
            }}
            title={
              <img
                style={{
                  height: "2em",
                  margin: "10px",
                }}
                src={require("Icons/PokeApi.png")}
                alt="Pokemon Dex Logo"
              />
            }
            subheader={
              <Box>
                <span className={stateClass("cardSubheaderText")}>
                  <SplitText
                    charPoses={subheadingCharPoses}
                    initialPose={"exit"}
                    pose={panelOpen ? "enter" : "exit"}
                  >
                    Search Pokémon
                  </SplitText>
                </span>{" "}
                <span className={stateClass("cardSubheaderIcon")}>
                  <SearchIcon fontSize="small" />
                </span>
              </Box>
            }
          />
          <CardContent className={stateClass("cardContent")}>
            <SearchInput
              {...{
                searchTxtRef,
                isBusy,
                isSearching,
                isError: loadingState === SEARCH_POKEMON.FAILED,
                panelOpen,
                isFocused,
                handleFocus,
                handleUnfocus,
                searchPokemon,
              }}
              helperText={
                <HelperText
                  {...{
                    totalPokemon,
                    preSearchState,
                    isSearching,
                    loadingState,
                    mainTheme,
                  }}
                />
              }
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default SmoothIn(SearchPanel);
