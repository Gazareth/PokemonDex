import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { searchPokemon } from "Store/actions";
import { SEARCH_POKEMON } from "Store/actions/types";

import useKeyDown from "Hooks/KeyDown";

import { POKEMON_DEX_PATHS as PokemonDexURLs } from "Constants";

import Search from "./Search";
import View from "./View";
import Favourites from "./Favourites";

const Screen = ({ screenIndex, ...props }) => {
  const screenToShow = [Search, View, Favourites];

  return screenIndex === -1
    ? null
    : React.createElement(screenToShow[screenIndex], props);
};

// eslint-disable-next-line no-unused-vars
let switchScreenTimer = null;

const PokemonDexScreens = ({ screenIndex, searchingPokemon }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loadingPokemon = useSelector((state) => state.pokemon.loading);
  const havePokemon = useSelector((state) => state.pokemon.haveData);

  const [apparentScreen, setApparentScreen] = useState(-1);
  const [pendingScreen, setPendingScreen] = useState(screenIndex);

  const isScreenPending = useMemo(() => pendingScreen !== apparentScreen, [
    pendingScreen,
    apparentScreen,
  ]);

  //Handle screen switch
  const switchScreen = useCallback((newScreen) => {
    setApparentScreen(newScreen);
  }, []);

  const queueScreen = useCallback(
    (newScreen) => {
      setPendingScreen(newScreen);
      switchScreenTimer = setTimeout(
        () => {
          switchScreen(newScreen);
          switchScreenTimer = null;
        },
        apparentScreen === -1
          ? process.env.REACT_APP_INITIALSCREENDELAY
          : process.env.REACT_APP_SWITCHSCREENDELAY
      );
    },
    [apparentScreen, switchScreen]
  );

  // If we're not on the right screen, update
  useEffect(() => {
    if (
      pendingScreen !== screenIndex ||
      (apparentScreen !== pendingScreen && !switchScreenTimer)
    )
      queueScreen(screenIndex);
  }, [apparentScreen, pendingScreen, queueScreen, screenIndex]);

  // Update the URL or start searching for pokemon
  useEffect(() => {
    // If we're on pokemon page
    if (screenIndex === 1) {
      // If we don't have the right pokemon loaded
      console.log("on page 1. Loading is: ", loadingPokemon);
      if (
        (havePokemon === 0 || havePokemon !== searchingPokemon) &&
        loadingPokemon === SEARCH_POKEMON.NONE
      ) {
        console.log(" Don't have the right pokemon...");
        // Search for the pokemon in question
        console.log("   DISPATCHING SEARCHPokemon!");
        dispatch(searchPokemon(searchingPokemon));
      } else {
        // We have a pokemon but it doesn't match the search??
        console.log(
          "We have a pokemon and it's the one set to be searched/loaded through the URL!!"
        );
      }
    }
    if (screenIndex === 0 && loadingPokemon === SEARCH_POKEMON.DONE)
      history.push(`/view/?id=${havePokemon}`);

    if (screenIndex === 1 && loadingPokemon === SEARCH_POKEMON.FAILED)
      history.push(`/search/`);
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

  return (
    <Screen displayContent={!isScreenPending} screenIndex={apparentScreen} />
  );
};

export default PokemonDexScreens;
