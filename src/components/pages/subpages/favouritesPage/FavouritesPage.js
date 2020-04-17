import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import useAnimEngine from "hooks/AnimEngine";

import Grid from "@material-ui/core/Grid";

const mapStateToProps = state => {
  return {
    favourites: state.favourites,
    loading: state.pokemon.loading
  };
};

const FavouritesPage = ({ displayContent, favourites }) => {
  const anim = useAnimEngine(3, displayContent, 450);

  return (
    <>
      <h2>Favourite Pokemon </h2>
      {favourites.map(fav => (
        <div>{fav.id}</div>
      ))}
    </>
  );
};

export default connect(mapStateToProps)(FavouritesPage);
