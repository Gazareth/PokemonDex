import React from "react";

import "./App.css";
import "typeface-roboto";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider as StoreProvider } from "react-redux";
import rootReducer from "./store/reducers";

import { BrowserRouter, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import ConnectedTheme from "contexts/ConnectedTheme";

import MainPage from "./components/pages/MainPage";
import Box from "@material-ui/core/Box";
import PokeAppBar from "components/PokeAppBar";

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

  console.log("Initial store... ", store);

  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <ConnectedTheme>
          <CssBaseline />
          <Box className={classes.rootBox} bgcolor="background.default">
            <PokeAppBar />
            <Route
              exact
              path={["/", "/home*", "/main*"]}
              render={() => <MainPage />}
            />
          </Box>
        </ConnectedTheme>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
