import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

import PokemonCard from "Components/PokemonCard";

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
    "& > *": {
      margin: `0 ${theme.spacing(2.5)}px`,
      padding: `12px ${theme.spacing(8)}px`,
    },
  },
  viewButton: {
    backgroundColor: theme.palette.success.light,
  },
  removeButton: {
    backgroundColor: theme.palette.error.main,
  },
}));

const ExpansionPanel = withStyles((theme) => ({
  root: {
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
    margin: "6px 0",
    "&$expanded": {
      margin: " 6px 0",
    },
  },
  expanded: {},
}))(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    //margin: "0 20%",
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

  console.log("FAVOURITES: ", favourites);

  return (
    <>
      <h2>Favourite Pokemon </h2>
      {/* <Grid item container spacing={5} className={classes.flexCol}>
        <Grid item container spacing={4} className={classes.inflexible}> */}
      <div>
        {favourites.map(
          (fav) =>
            console.log("FAVOURITE INFO: ", fav) || (
              <ExpansionPanel
                key={fav.id}
                square
                expanded={expanded === `panel-${fav.id}`}
                onChange={handleChange(`panel-${fav.id}`)}
              >
                <ExpansionPanelSummary>
                  <Grid item xs={12}>
                    <PokemonCard
                      key={fav.id}
                      {...anim()}
                      variant="favourites"
                      pokemonInfo={fav}
                    />
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className={classes.buttonsRoot}>
                    <Button
                      variant="contained"
                      classes={{ root: classes.viewButton }}
                      size="large"
                      className={classes.button}
                    >
                      <SaveIcon />
                    </Button>
                    <Button
                      variant="contained"
                      classes={{ root: classes.removeButton }}
                      size="large"
                      className={classes.button}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
        )}
      </div>
      {/* </Grid>
      </Grid> */}
    </>
  );
};

export default React.memo(connect(mapStateToProps)(FavouritesPage));
