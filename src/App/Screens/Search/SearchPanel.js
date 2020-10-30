import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { SEARCH_POKEMON } from "Store/actions/types";
import { LOADING_STRINGS as loadingStrings } from "Constants";

import clsx from "clsx";
import Color from "color";

import SearchInput from "./Sections/SearchInput";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import SplitText from "react-pose-text";
import SmoothIn from "Utils/transitionSmoothIn";

import Box from "@material-ui/core/Box";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";

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
      thickness={18}
      style={{
        verticalAlign: "text-top",
        marginRight: "0.375rem",
        marginTop: "0.01rem",
        color,
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
          color: theme.palette.text.disabled,
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

  const handleClick = useCallback(
    () => searchTxtRef.current && searchTxtRef.current.focus(),
    [searchTxtRef]
  );

  useEffect(() => {
    focusTimer.current = setTimeout(() => handleClick(), 1500);
    return () => clearTimeout(focusTimer);
  }, []);

  const handleFocus = () => setIsFocused(true);

  const handleUnfocus = useCallback(() => {
    setIsFocused(false);
    clearTimeout(focusTimer.current);
    //focusTimer.current = setTimeout(() => handleClick(), 1500); //REPEATEDLY REASSIGN FOCUS
  }, []);

  useEffect(() => setSearching(!searchReady), [searchReady]);
  const panelOpen = isFocused && searchReady;

  const mainAnim = anim();

  const cardStates = ["Closed", "Open", "Busy"];
  const cardState = Math.max(isFocused * 2 + searchReady * -1, 0);
  const stateClass = (prefix) =>
    clsx(classes[prefix], classes[prefix + "-" + cardStates[cardState]]);

  const touchRippleClasses = useMemo(
    () => clsx(!panelOpen && classes.touchRippleColor),
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
          component="div"
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleClick();
          }}
          classes={{
            root: classes.cardActionArea,
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
                searching,
                panelOpen,
                isFocused,
                handleFocus,
                handleUnfocus,
                searchPokemon,
                error: loadingState === SEARCH_POKEMON.FAILED,
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
