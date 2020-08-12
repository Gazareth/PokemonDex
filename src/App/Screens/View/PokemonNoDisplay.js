import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { SEARCH_POKEMON } from "Store/actions/types";
import { LOADING_STRINGS as loadingStrings } from "Constants";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import LinearProgress from "@material-ui/core/LinearProgress";

import Fade from "@material-ui/core/Fade";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import clsx from "clsx";

const loaderLineStyles = (theme, childNum) => ({
  ["&:nth-child(" + childNum + ")"]: {
    animationDelay: `-${50 * childNum}ms`,
    "& .loader-line": {
      position: "absolute",
      boxSizing: "border-box",
      border: "2px solid transparent",
      borderColor:
        childNum < 5
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
      height: theme.spacing(0.75 + 1.75 * (7 - childNum)),
      width: theme.spacing(0.75 + 1.75 * (7 - childNum)),
      borderRadius: "100%",
      margin: "0 auto",
      top: `${7 * childNum}px`,
      left: "0",
      right: "0",
      //width: "90px",
      //height: "100px",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  "@keyframes spin": {
    "0%": {},
    "15%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },

  loadingBar: {
    margin: `0 40%`,
    filter: "grayscale(50%) opacity(80%)",
  },
  // loadingMainColor: {
  //   color: theme.palette.action.hover,
  // },
  noDisplay: {
    display: "none",
  },
  loaderContainer: {
    bottom: "0",
    height: "75px",
    left: "0",
    margin: `${theme.spacing(5)}px auto`,
    position: "relative",
    right: "0",
    top: "0",
    width: "100px",
    filter: "grayscale(50%) opacity(80%)",
    //marginBottom: theme.spacing(2),
  },
  loaderLineWrap: {
    position: "absolute",
    boxSizing: "border-box",
    overflow: "hidden",
    height: "50px",
    width: "100px",
    left: "0",
    top: "0",
    transformOrigin: "50% 100%",
    animation: "$spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite",
  },
  ...[1, 2, 3, 4, 5, 6].reduce(
    (classes, childNum) => ({
      ...classes,
      ["loaderLine" + childNum]: loaderLineStyles(theme, childNum),
    }),
    {}
  ),
}));

const SEARCH_STATES = Object.keys(SEARCH_POKEMON).map(
  (key) => SEARCH_POKEMON[key]
);

const getSearchStage = (loadingStage) => SEARCH_STATES.indexOf(loadingStage);
const mapSearchStage = (stage) => (stage > 5 ? 100 : (stage / 5) * 100);

const mapStateToProps = (state) => {
  return {
    loading: state.pokemon.loading,
  };
};

const PokeballLoader = React.memo(({ classes }) => (
  <div className={classes.loaderContainer}>
    {[1, 2, 3, 4, 5, 6].map((childNum) => {
      const dynamicClassName = "loaderLine" + childNum;
      return (
        <div
          key={childNum}
          className={clsx(classes.loaderLineWrap, classes[dynamicClassName])}
        >
          <div className="loader-line"></div>
        </div>
      );
    })}
  </div>
));

const PokemonNoDisplay = ({ displayContent, loading }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  useEffect(() => {
    const searchStage = getSearchStage(loading);
    if (searchStage > 0) {
      const bufferVal = mapSearchStage(searchStage);
      setBuffer(bufferVal);
      if (searchStage > 1) {
        setProgress(mapSearchStage(searchStage - 1));
      }
    }
  }, [loading]);

  const progressRef = React.useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
      } else {
        const diff = buffer - progress;
        setProgress(progress + diff / 2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 200 + Math.round(Math.random() * 600));
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid container style={{ height: "100%" }} direction="column">
      <Grid item container style={{ height: "100%" }}>
        <Box flex={1} display="flex" alignItems="center">
          <Fade
            in={displayContent && loading !== SEARCH_POKEMON.DONE}
            timeout={450}
            style={{
              visibility: "visible",
              transitionDelay:
                loading === SEARCH_POKEMON.DONE
                  ? `${process.env.REACT_APP_SWITCHSCREENDELAY * 0.75}ms`
                  : "0ms",
            }}
            appear
          >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <PokeballLoader classes={classes} />
              </Grid>
              <Grid item style={{ flex: 1 }}>
                <LinearProgress
                  classes={{
                    root: classes.loadingBar,
                    dashed: classes.noDisplay,
                  }}
                  color="secondary"
                  style={{ flex: "1" }}
                  variant="buffer"
                  value={progress}
                  valueBuffer={100}
                />
              </Grid>
              <Grid item>
                <Typography color="textSecondary" align="center">
                  {loadingStrings[loading]}
                </Typography>
              </Grid>
            </Grid>
          </Fade>
        </Box>
      </Grid>
    </Grid>
  );
};

PokemonNoDisplay.propTypes = {};

export default connect(mapStateToProps)(PokemonNoDisplay);
