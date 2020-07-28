import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { SEARCH_POKEMON } from "Store/actions/types";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import LinearProgress from "@material-ui/core/LinearProgress";

import Fade from "@material-ui/core/Fade";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.text.disabled,
  },
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

const PokemonNoDisplay = ({ displayContent, loading }) => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  useEffect(() => {
    console.log(
      "SEARCH STATE UPDATED! ",
      loading,
      " index: ",
      SEARCH_STATES.indexOf(loading) / 5
    );
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
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid container style={{ height: "100%" }} direction="column">
      <Grid item container style={{ height: "100%" }}>
        <Box m={10} flex={1} display="flex" alignItems="center">
          <Fade in={displayContent} appear>
            <LinearProgress
              style={{ flex: "1" }}
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
            />
          </Fade>
        </Box>
      </Grid>
    </Grid>
  );
};

PokemonNoDisplay.propTypes = {};

export default connect(mapStateToProps)(PokemonNoDisplay);
