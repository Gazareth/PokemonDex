import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import TabbedScreens from "./TabbedScreens";

const Copyright = ({ theme }) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
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

const useStyles = makeStyles(theme => ({
  flexCol: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "auto",
    overflow: "hidden"
  },

  layout: {
    width: "65vh",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    background: theme.palette.background.secondary,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

const MainPage = () => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  return (
    <>
      <main className={clsx(classes.flexCol, classes.layout)}>
        <Paper className={clsx(classes.flexCol, classes.paper)}>
          <TabbedScreens />
          {/* <PokemonPage /> */}
        </Paper>
        <Copyright theme={mainTheme} className={classes.footer} />
      </main>
    </>
  );
};

export default MainPage;
