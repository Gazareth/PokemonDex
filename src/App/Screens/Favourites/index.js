import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Filter9PlusIcon from "@material-ui/icons/Filter9Plus";
import SwapVerticalCircleTwoToneIcon from "@material-ui/icons/SwapVerticalCircleTwoTone";
import DeleteSweepTwoToneIcon from "@material-ui/icons/DeleteSweepTwoTone";

import PokemonFavouritesList from "./PokemonFavouritesList";

const mapStateToProps = (state) => {
  return {
    favourites: state.favourites,
    loading: state.pokemon.loading,
  };
};

const FavouritesPage = ({ displayContent, favourites }) => {
  const history = useHistory();

  const [selectedFavourite, setSelectedFavourite] = React.useState(0);

  const isFavouriteSelected = useCallback(
    (favId) => selectedFavourite === favId,
    [selectedFavourite]
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

  return (
    <>
      <Typography component="h3" variant="h5">
        Favourite Pokemon <Filter9PlusIcon />
      </Typography>
      <Grid container direction="column">
        <Grid item container xs={8}></Grid>
        <Grid item container xs={4} justify="flex-end">
          <IconButton>
            <SwapVerticalCircleTwoToneIcon fontSize="large" />
          </IconButton>
          <IconButton>
            <DeleteSweepTwoToneIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <PokemonFavouritesList
        {...{
          favourites,
          animateIn,
          displayContent,
          isFavouriteSelected,
          handleSelectFavourite,
          handleSelectNone,
          handleViewFavourite,
        }}
      />
    </>
  );
};

export default React.memo(connect(mapStateToProps)(FavouritesPage));
