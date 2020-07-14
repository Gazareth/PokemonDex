import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PokemonFavourite from "./PokemonFavourite";

import useAnimEngine from "Hooks/AnimEngine";

const useStyles = makeStyles((theme) => ({
  favouriteEntry: {
    margin: `${theme.spacing(0.75)}px ${theme.spacing(1)}px`,
  },
  viewButton: {
    backgroundColor: theme.palette.success.light,
  },
  viewBackIcon: {
    transform: "scaleX(-1)",
  },
  removeButton: {
    backgroundColor: theme.palette.error.main,
  },
}));

const PokemonFavouritesList = ({
  favourites,
  animateIn,
  displayContent,
  isFavouriteSelected,
  handleSelectFavourite,
  handleSelectNone,
  handleViewFavourite,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const anim = useAnimEngine(favourites.length, displayContent && animateIn);

  const noneSelected = isFavouriteSelected(0);

  return (
    <ClickAwayListener onClickAway={handleSelectNone}>
      <div>
        {favourites.map((fav, i) => {
          const favouriteSelected = isFavouriteSelected(fav.id);

          return (
            <div
              key={fav.id}
              className={classes.favouriteEntry}
              onClick={
                !favouriteSelected ? handleSelectFavourite(fav.id) : null
              }
            >
              <PokemonFavourite
                {...anim()}
                pokemonInfo={fav}
                favouriteIndex={i}
                displayContent={displayContent}
                isSelected={favouriteSelected}
                isNotSelected={!noneSelected && !favouriteSelected}
                hideOptions={handleSelectNone}
                viewPokemon={handleViewFavourite}
                style={{
                  opacity: favouriteSelected || noneSelected ? "1" : "0.65",
                }}
              />
            </div>
          );
        })}
      </div>
    </ClickAwayListener>
  );
};

export default PokemonFavouritesList;
