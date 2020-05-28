import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import TabbedScreens from "./TabbedScreens";

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
      <Link color="secondary" href="https://material-ui.com/">
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
    overflow: "hidden",
  },

  layout: {
    width: "65vh",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    background: theme.palette.background.secondary,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const PokemonDexURLs = ["search", "view", "favourites"];

const getIndexFromPath = (path) => {
  const pathPage = path.split("/")[1];
  const pageIndex = PokemonDexURLs.findIndex((endpt) =>
    pathPage.startsWith(endpt)
  );
  return pageIndex;
};

const getPathFromIndex = (index) => {
  return `/${PokemonDexURLs[index]}/`;
};

const PokemonRouter = () => {
  const location = useLocation();
  const history = useHistory();
  let tabIndex = getIndexFromPath(location.pathname);

  //redirect to search page if nothing found
  if (tabIndex === -1) {
    tabIndex = 0;
    history.push(getPathFromIndex(tabIndex));
  }

  return (
    <TabbedScreens
      pagePathIndex={tabIndex}
      setPagePathIndex={(index) => history.push(getPathFromIndex(index))}
    />
  );
};

const MainPage = () => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <main className={clsx(classes.flexCol, classes.layout)}>
            <Paper className={clsx(classes.flexCol, classes.paper)}>
              <PokemonRouter />
            </Paper>
            <Copyright theme={mainTheme} className={classes.footer} />
          </main>
        </Route>
      </Switch>
    </Router>
  );
};

export default MainPage;
