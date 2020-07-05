import React, { useState, useEffect, useCallback, useMemo } from "react";
import { connect } from "react-redux";

import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";

import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";

import SwipeableViews from "react-swipeable-views";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import PlayArrow from "@material-ui/icons/PlayArrow";
import PokeballIcon from "Icons/PokeballIcon";
import StarTwoTone from "@material-ui/icons/StarTwoTone";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import PokemonFavourite from "./PokemonFavourite";

import useAnimEngine from "Hooks/AnimEngine";

const useStyles = makeStyles((theme) => ({
  flexCol: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "auto",
    overflow: "hidden",
  },
  inflexible: {
    flex: "none",
  },
  favouriteEntry: {
    margin: `${theme.spacing(0.75)}px`,
  },
  buttonsRoot: {
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
    // marginLeft: "0%",
    padding: `${theme.spacing(2.25)}px 3%`,
    // paddingBottom: `${theme.spacing(2.75)}px`,
    "& > div > div > button": {
      //margin: `0 ${theme.spacing(2)}px`,
      // padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
      "&:first-child": {
        // paddingLeft: `${theme.spacing(2.75)}px`,
        // paddingRight: `${theme.spacing(3.25)}px`,
      },
      "&:last-child": {
        // padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
        "& > span > svg": {
          //fontSize: "2rem",
        },
      },
    },
  },
  viewButton: {
    backgroundColor: theme.palette.success.light,
  },
  viewBackIcon: {
    transform: "scaleX(-1)",
  },
  removeButton: {
    backgroundColor: theme.palette.error.main,
  },
}));

const mapStateToProps = (state) => {
  return {
    favourites: state.favourites,
    loading: state.pokemon.loading,
  };
};

const FavouritesPage = ({ displayContent, favourites }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [expanded, setExpanded] = React.useState(0);

  const isPanelExpanded = useCallback((panel) => expanded === panel, [
    expanded,
  ]);

  const handleClickOn = (panel) => (event, newExpanded) => {
    console.log("HANDLING ClickOn!!!", panel);
    setExpanded(isPanelExpanded(panel) ? 0 : panel);
  };

  const handleClickAway = () => setExpanded(0);

  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 250);
  }, []);

  const anim = useAnimEngine(
    favourites.length,
    displayContent && animateIn,
    125
  );

  return (
    <>
      <h2>Favourite Pokemon </h2>
      {/* <Grid item container spacing={5} className={classes.flexCol}>
        <Grid item container spacing={4} className={classes.inflexible}> */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          {favourites.map((fav) => {
            const showOptions = isPanelExpanded(fav.id);
            console.log(
              "MAPPING ",
              fav.id,
              " show options? ",
              showOptions,
              " because panel is: ",
              expanded
            );
            return (
              <div
                key={fav.id}
                className={classes.favouriteEntry}
                onClick={!showOptions ? handleClickOn(fav.id) : null}
              >
                <PokemonFavourite
                  {...anim()}
                  variant="favourites"
                  pokemonInfo={fav}
                  showOptions={showOptions}
                  hideOptions={handleClickAway}
                />
              </div>
            );
          })}
        </div>
      </ClickAwayListener>
    </>
  );
};

export default React.memo(connect(mapStateToProps)(FavouritesPage));
