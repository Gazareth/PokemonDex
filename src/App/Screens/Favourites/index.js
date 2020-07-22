import React, { useState, useEffect, useMemo, useCallback } from "react";
import { connect } from "react-redux";

import useAnimEngine from "Hooks/AnimEngine";

import {
  moveFavourite,
  reorderFavourites,
  cancelReorderFavourites,
  removeFavourite,
} from "Store/actions";

import { useHistory } from "react-router-dom";

import PokemonFavouritesControls from "./PokemonFavouritesControls";
import PokemonFavouritesList from "./PokemonFavouritesList";

const favouritesControlModes = {
  DEFAULT: "FAVOURITES",
  SWITCH: "FAVOURITES_SWITCH",
  DELETE: "FAVOURITES_DELETE",
};

const toggleSwitchMode = (mode) =>
  mode === favouritesControlModes.SWITCH
    ? favouritesControlModes.DEFAULT
    : favouritesControlModes.SWITCH;
const toggleDeleteMode = (mode) =>
  mode === favouritesControlModes.DELETE
    ? favouritesControlModes.DEFAULT
    : favouritesControlModes.DELETE;

const mapStateToProps = (state) => {
  return {
    storedFavourites: state.favourites.favourites,
    favouritesOrder: state.favourites.favouritesOrder,
    loading: state.pokemon.loading,
  };
};

const mapDispatchToProps = {
  moveFavourite,
  reorderFavourites,
  cancelReorderFavourites,
  removeFavourite,
};

const FavouritesPage = ({
  displayContent,
  storedFavourites,
  favouritesOrder,
  moveFavourite,
  reorderFavourites,
  cancelReorderFavourites,
  removeFavourite,
}) => {
  const history = useHistory();

  const [favouritesMode, setFavouritesMode] = React.useState(
    favouritesControlModes.DEFAULT
  );
  const [selectedFavourite, setSelectedFavourite] = React.useState(0);

  const isFavouriteSelected = useCallback(
    (favId) => selectedFavourite === favId,
    [selectedFavourite]
  );

  const inSwitchMode = favouritesMode === favouritesControlModes.SWITCH;
  const inDeleteMode = favouritesMode === favouritesControlModes.DELETE;

  const favourites = useMemo(
    () =>
      inSwitchMode
        ? favouritesOrder.map((favId) =>
            storedFavourites.find(({ id }) => id === favId)
          )
        : storedFavourites,
    [favouritesOrder, inSwitchMode, storedFavourites]
  );

  const handleSelectFavourite = (favId) => (event, newFavourite) => {
    setSelectedFavourite(isFavouriteSelected(favId) ? 0 : favId);
  };

  const handleSelectNone = () => setSelectedFavourite(0);

  const handleViewFavourite = () =>
    displayContent && history.push(`/view/?id=${selectedFavourite}`);

  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 250);
  }, []);

  const buttonsAnim = useAnimEngine(
    2,
    displayContent && animateIn,
    {
      duration: 245,
    },
    75
  );

  const favListAnim = useAnimEngine(
    favourites.length,
    displayContent && animateIn
  );

  return (
    <>
      <PokemonFavouritesControls
        toggleSwitchMode={() => setFavouritesMode(toggleSwitchMode)}
        toggleDeleteMode={() => setFavouritesMode(toggleDeleteMode)}
        {...{
          anim: buttonsAnim,
          inDefaultMode: favouritesMode === favouritesControlModes.DEFAULT,
          inSwitchMode,
          inDeleteMode,
          reorderFavourites,
          cancelReorderFavourites,
        }}
      />
      <PokemonFavouritesList
        {...{
          favourites,
          moveFavourite,
          removeFavourite,
          anim: favListAnim,
          displayContent,
          inSwitchMode,
          isFavouriteSelected,
          handleSelectFavourite,
          handleSelectNone,
          handleViewFavourite,
        }}
      />
    </>
  );
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(FavouritesPage)
);
