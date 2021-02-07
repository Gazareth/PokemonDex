import React, { useState, useEffect, useMemo, useCallback } from "react";
import { connect } from "react-redux";

import { useTheme } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
  const theme = useTheme();

  const [favouritesMode, setFavouritesMode] = React.useState(
    favouritesControlModes.DEFAULT
  );
  const [selectedFavourite, setSelectedFavourite] = React.useState(0);

  const isFavouriteSelected = useCallback(
    (favId) => selectedFavourite === favId,
    [selectedFavourite]
  );

  const inDefaultMode = favouritesMode === favouritesControlModes.DEFAULT;
  const inSwitchMode = favouritesMode === favouritesControlModes.SWITCH;
  const inDeleteMode = favouritesMode === favouritesControlModes.DELETE;

  const favourites = useMemo(
    () =>
      favouritesOrder.map((favId) => ({
        ...storedFavourites.find(({ id }) => id === favId),
        id: favId,
      })),
    [favouritesOrder, storedFavourites]
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

  const [animateControlsIn, setAnimateControlsIn] = useState(false);

  const displayControls = useMemo(() => displayContent && animateControlsIn, [
    animateControlsIn,
    displayContent,
  ]);

  const displayList = useMemo(() => displayContent && animateIn, [
    animateIn,
    displayContent,
  ]);

  const buttonsAnim = useAnimEngine(
    2,
    displayControls,
    { delay: 275, duration: 225 },
    100,
    0.2
  );

  const favListAnim = useAnimEngine(
    favourites.length,
    displayList,
    { delay: 375, duration: 350, syncInv: true },
    90,
    0.75,
    0,
    () => setAnimateControlsIn(true)
  );

  return (
    <Grid container style={{ height: "100%" }} direction="column">
      {storedFavourites.length > 0 ? (
        <>
          <PokemonFavouritesControls
            toggleSwitchMode={() => setFavouritesMode(toggleSwitchMode)}
            toggleDeleteMode={() => setFavouritesMode(toggleDeleteMode)}
            {...{
              anim: buttonsAnim,
              displayContent: displayControls,
              inDefaultMode,
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
              reorderFavourites,
              anim: favListAnim,
              displayContent: displayList,
              inDefaultMode,
              inSwitchMode,
              isFavouriteSelected,
              handleSelectFavourite,
              handleSelectNone,
              handleViewFavourite,
            }}
          />
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            color: theme.palette.text.disabled,
            marginTop: "5vh",
          }}
        >
          <Typography color="textSecondary" variant="h5" gutterBottom>
            No favourites
          </Typography>
          <Typography variant="caption">
            Set searched Pokémon as your favourites to see them here!
          </Typography>
        </div>
      )}
    </Grid>
  );
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(FavouritesPage)
);
