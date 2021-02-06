import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import usePlaySound from "Hooks/usePlaySound";

import { searchPokemon } from "Store/actions";
import { SEARCH_POKEMON } from "Store/actions/types";

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
  const apiInterval =
    useSelector((state) => state.theme.interval) ||
    process.env.REACT_APP_APIINTERVAL;

  const { playSearchMode, playViewMode, playFavMode } = usePlaySound();

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
      switch (newScreen) {
        case 0:
          playSearchMode();
          break;
        case 1:
          playViewMode();
          break;
        case 2:
          playFavMode();
          break;
        default:
          break;
      }
      switchScreenTimer = setTimeout(
        () => {
          switchScreen(newScreen);
          // PLAY SOUND
          switchScreenTimer = null;
        },
        apparentScreen === -1
          ? process.env.REACT_APP_INITIALSCREENDELAY
          : process.env.REACT_APP_SWITCHSCREENDELAY
      );
    },
    [apparentScreen, playFavMode, playSearchMode, playViewMode, switchScreen]
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
      if (
        (havePokemon === 0 || havePokemon !== searchingPokemon) &&
        loadingPokemon === SEARCH_POKEMON.NONE
      ) {
        // Search for the pokemon in question
        dispatch(searchPokemon(searchingPokemon, apiInterval));
      } else {
        // We have a pokemon but it doesn't match the search??
      }
    }
    // Search complete! Navigate to view page!
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
    apiInterval,
  ]);

  return (
    <Screen displayContent={!isScreenPending} screenIndex={apparentScreen} />
  );
};

export default PokemonDexScreens;
