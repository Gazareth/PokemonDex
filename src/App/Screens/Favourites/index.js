import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";

import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import PokeballIcon from "Icons/PokeballIcon";
import PlayArrow from "@material-ui/icons/PlayArrow";
import StarTwoTone from "@material-ui/icons/StarTwoTone";

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

const ExpansionPanel = withStyles((theme) => ({
  root: {
    margin: "6px 0",
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
}))(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.background.quaternary,
    backgroundColor: "transparent",
    //border: `1px solid ${theme.palette.background.senary}`,
    //borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    margin: "0px 0",
    "&$expanded": {
      margin: " 0px 0",
    },
  },
  expanded: {},
}))(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    padding: "0",
    marginBottom: "18px",
    //border: `1px solid ${theme.palette.background.senary}`,
    //borderRadius: "0 0 2rem 2rem",
  },
}))(MuiExpansionPanelDetails);

const mapStateToProps = (state) => {
  return {
    favourites: state.favourites,
    loading: state.pokemon.loading,
  };
};

const FavouritesPage = ({ displayContent, favourites }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    const newValue = expanded ? false : panel;
    setExpanded(newExpanded ? newValue : false);
  };

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
      <div>
        {favourites.map((fav) => {
          const expandThis = expanded === `panel-${fav.id}`;
          return (
            <ExpansionPanel
              key={fav.id}
              square
              expanded={expandThis}
              onChange={handleChange(`panel-${fav.id}`)}
            >
              <ExpansionPanelSummary>
                <Grid item xs={12}>
                  <PokemonFavourite
                    key={fav.id}
                    {...anim()}
                    variant="favourites"
                    pokemonInfo={fav}
                  />
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div className={classes.buttonsRoot} elevation={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Zoom
                        in={expandThis}
                        style={{
                          transitionDelay: expandThis ? "125ms" : "0ms",
                        }}
                      >
                        <Button
                          variant="contained"
                          classes={{ root: classes.viewButton }}
                          size="large"
                          className={classes.button}
                        >
                          <PlayArrow className={classes.viewBackIcon} />
                          <PokeballIcon />
                        </Button>
                      </Zoom>
                    </Grid>
                    <Grid container item xs={6} justify="flex-end">
                      <Zoom
                        in={expandThis}
                        style={{
                          transitionDelay: expandThis ? "250ms" : "0ms",
                        }}
                      >
                        <Button
                          variant="contained"
                          classes={{ root: classes.removeButton }}
                          size="large"
                          className={classes.button}
                        >
                          <StarTwoTone />
                        </Button>
                      </Zoom>
                    </Grid>
                  </Grid>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
      {/* </Grid>
      </Grid> */}
    </>
  );
};

export default React.memo(connect(mapStateToProps)(FavouritesPage));
