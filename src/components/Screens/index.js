import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { searchPokemon } from "store/actions";
import { SEARCH_POKEMON } from "store/actions/types";

import useKeyDown from "hooks/KeyDown";

import PokemonDexURLs from "Constants";

import Search from "./Search";
import View from "./View";
import Favourites from "./Favourites";

const Screen = ({ screenIndex, ...props }) => {
  const screenToShow = [Search, View, Favourites];

  return React.createElement(screenToShow[screenIndex], props);
};

// eslint-disable-next-line no-unused-vars
let switchScreenTimer = null;

const PokemonDexScreens = ({ screenIndex, searchingPokemon }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loadingPokemon = useSelector((state) => state.pokemon.loading);
  const havePokemon = useSelector((state) => state.pokemon.haveData);

  const [apparentScreen, setApparentScreen] = useState(screenIndex);
  const [pendingScreen, setPendingScreen] = useState(screenIndex);

  //Handle screen switch
  const switchScreen = useCallback((newScreen) => {
    setApparentScreen(newScreen);
  }, []);

  const queueScreen = useCallback(
    (newScreen) => {
      setPendingScreen(newScreen);
      switchScreenTimer = setTimeout(() => {
        switchScreen(newScreen);
        switchScreenTimer = null;
      }, process.env.REACT_APP_TABSWITCHTIME);
    },
    [switchScreen]
  );

  // If we're not on the right screen, update
  useEffect(() => {
    if (apparentScreen !== screenIndex && pendingScreen !== screenIndex)
      queueScreen(screenIndex);
  }, [apparentScreen, pendingScreen, queueScreen, screenIndex]);

  // Update the URL or start searching for pokemon
  useEffect(() => {
    if (
      screenIndex === 1 &&
      havePokemon === 0 &&
      searchingPokemon > 0 &&
      loadingPokemon === SEARCH_POKEMON.NONE
    ) {
      console.log("DISPATCHING SEARCHPokemon!");
      dispatch(searchPokemon(searchingPokemon));
    }
    if (loadingPokemon === SEARCH_POKEMON.DONE)
      history.push(`/view/?id=${havePokemon}`);
    // }
  }, [
    loadingPokemon,
    history,
    havePokemon,
    screenIndex,
    searchingPokemon,
    dispatch,
  ]);

  //Handle key down
  const handleLeftRight = useCallback(
    (event) => {
      if (havePokemon <= 0) return false;
      let newScreen = apparentScreen;
      switch (event.keyCode) {
        case 37:
          console.log("Pressed left! Pending screen? ", pendingScreen);
          if (pendingScreen > 0) newScreen--;
          break;
        case 39:
          console.log("Pressed right! Pending screen? ", pendingScreen);
          if (pendingScreen < 2) newScreen++;
          break;
        default:
          break;
      }
      if (newScreen !== apparentScreen && newScreen !== pendingScreen) {
        const havePokemonPath =
          newScreen === 1 && havePokemon > 0 ? `/?id=${havePokemon}` : "";
        history.push(`/${PokemonDexURLs[newScreen]}${havePokemonPath}`);
      }
      if (event.keyCode === 27) {
        //Do whatever when esc is pressed
      }
    },
    [apparentScreen, havePokemon, pendingScreen, history]
  );

  // //Detect KeyDown
  useKeyDown(handleLeftRight);

  const isScreenPending = useMemo(() => pendingScreen !== apparentScreen, [
    pendingScreen,
    apparentScreen,
  ]);

  return (
    <Screen displayContent={!isScreenPending} screenIndex={apparentScreen} />
  );
};

export default PokemonDexScreens;
