import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";

import PokeAppBar from "App/PokeAppBar";
import PokemonDexRouter from "./PokemonDexRouter";
import Credits from "./Credits";

const useStyles = makeStyles((theme) => ({
  flexCol: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "auto",
    overflow: "auto",
    [theme.breakpoints.down("xs")]: {
      height: "100%",
    },
  },

  layout: {
    [theme.breakpoints.down("xs")]: {
      height: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: theme.breakpoints.values.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    background: theme.palette.background.secondary,
    maxHeight: "min(100%, 869px)",
    padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,
    overflowX: "hidden",
    [theme.breakpoints.up("sm")]: {
      flexGrow: "0.85",
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(4),
    },
  },
}));

const MainPage = () => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <Router>
      <PokeAppBar />
      <Switch>
        <Route path="/Credits">
          <Credits />
        </Route>
        <Route path={"/"}>
          <main className={clsx(classes.flexCol, classes.layout)}>
            <Paper className={clsx(classes.flexCol, classes.paper)}>
              <PokemonDexRouter />
            </Paper>
          </main>
        </Route>
      </Switch>
    </Router>
  );
};

export default MainPage;
