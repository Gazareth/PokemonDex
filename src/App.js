import React from "react";

import "./App.css";
import "typeface-roboto";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider as StoreProvider } from "react-redux";
import rootReducer from "./store/reducers";

import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./theme";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import PokedexSVG from "./icons/PokedexIcon";

import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";

import MainPage from "./components/pages/MainPage";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  rootBox: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  appBar: {
    position: "relative"
  }
}));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const App = () => {
  const classes = useStyles();

  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme(store.theme.mode)}>
          <CssBaseline />
          <Box className={classes.rootBox} bgcolor="background.default">
            <AppBar
              position="absolute"
              color="default"
              className={classes.appBar}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <SvgIcon
                    component={PokedexSVG}
                    fontSize="large"
                    style={{ fill: "#C30D22" }}
                    viewBox="0 0 500 525"
                  />
                </IconButton>

                <Typography variant="h6" color="textSecondary" noWrap>
                  Pokémon Dex
                </Typography>
              </Toolbar>
            </AppBar>
            <Route
              exact
              path={["/", "/home*", "/main*"]}
              render={() => <MainPage />}
            />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
