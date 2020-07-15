import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import { useTheme } from "@material-ui/core/styles";

import useAnimEngine from "Hooks/AnimEngine";
import SmoothIn from "Utils/transitionSmoothIn";

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

const ControlButton = SmoothIn(
  ({ classes, IconComponent, hideOptions, ...props }) => (
    <IconButton style={props.style} onClick={() => hideOptions()}>
      <IconComponent fontSize="large" />
    </IconButton>
  )
);

const FavouritesPage = ({ displayContent, favourites }) => {
  const theme = useTheme();
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

  const anim = useAnimEngine(
    favourites.length + 2,
    displayContent && animateIn
  );

  return (
    <>
      <Typography component="h3" variant="h5">
        Favourite Pokemon <Filter9PlusIcon />
      </Typography>
      <Grid container direction="column">
        <Grid item container xs={8}></Grid>
        <Grid item container xs={4} justify="flex-end">
          <ControlButton
            {...anim()}
            IconComponent={SwapVerticalCircleTwoToneIcon}
            transitionType="Bounce"
            theme={theme}
          />
          <ControlButton
            IconComponent={DeleteSweepTwoToneIcon}
            transitionType="Bounce"
            {...anim()}
            theme={theme}
          />
        </Grid>
      </Grid>
      <PokemonFavouritesList
        {...{
          favourites,
          anim,
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
