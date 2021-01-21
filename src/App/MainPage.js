import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import PokeAppBar from "App/PokeAppBar";
import PokemonDexRouter from "./PokemonDexRouter";
import Credits from "./Credits";

const Copyright = ({ theme }) => {
  return (
    <Typography variant="caption" color="textSecondary" align="center">
      {"Pokedex icon by "}
      <Link
        color="textPrimary"
        href="https://www.flaticon.com/authors/those-icons"
        title="Those Icons"
      >
        Those Icons
      </Link>
      {" at: "}
      <Link
        color="textPrimary"
        href="https://www.flaticon.com/"
        title="Flaticon"
      >
        {" "}
        Flaticon
      </Link>
      {" • "}
      <Link color="primary" href="https://material-ui.com/">
        Material UI
      </Link>
      {" • "}
      <Link color="secondary" href="https://pokeapi.co/">
        PokeApi
      </Link>
      {/* {" • "}
      {new Date().getFullYear()} {" • "} */}
    </Typography>
  );
};

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
            <Copyright theme={mainTheme} className={classes.footer} />
          </main>
        </Route>
      </Switch>
    </Router>
  );
};

export default MainPage;
