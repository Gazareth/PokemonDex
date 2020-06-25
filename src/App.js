import React from "react";

import "./App.css";
import "typeface-roboto";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider as StoreProvider } from "react-redux";
import rootReducer from "./Store/reducers";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import ConnectedTheme from "Contexts/ConnectedTheme";

import MainPage from "./App/MainPage";
import Box from "@material-ui/core/Box";
import PokeAppBar from "App/PokeAppBar";

const useStyles = makeStyles((theme) => ({
  rootBox: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  appBar: {
    position: "relative",
  },
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
      <ConnectedTheme>
        <CssBaseline />
        <Box className={classes.rootBox} bgcolor="background.default">
          <PokeAppBar />
          <MainPage />
        </Box>
      </ConnectedTheme>
    </StoreProvider>
  );
};

export default App;
