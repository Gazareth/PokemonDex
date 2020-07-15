import React from "react";

import RootRef from "@material-ui/core/RootRef";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PokemonFavourite from "./PokemonFavourite";

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
  anim,
  displayContent,
  isFavouriteSelected,
  handleSelectFavourite,
  handleSelectNone,
  handleViewFavourite,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const noneSelected = isFavouriteSelected(0);

  const onDragEnd = () => {
    console.log("ended drag!");
  };

  return (
    <ClickAwayListener onClickAway={handleSelectNone}>
      <div>
        <DragDropContext>
          <Droppable droppableId={"PokemonFavouritesListDroppable"}>
            {(provided) => (
              <RootRef rootRef={provided.innerRef}>
                <div {...provided.droppableProps}>
                  {favourites.map((fav, i) => {
                    const favouriteSelected = isFavouriteSelected(fav.id);

                    return (
                      <Draggable
                        key={fav.id}
                        draggableId={`${fav.id}`}
                        index={i}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className={classes.favouriteEntry}
                            onClick={
                              !favouriteSelected
                                ? handleSelectFavourite(fav.id)
                                : null
                            }
                          >
                            <PokemonFavourite
                              {...anim()}
                              dragHandleProps={provided.dragHandleProps}
                              pokemonInfo={fav}
                              favouriteIndex={i}
                              displayContent={displayContent}
                              isSelected={favouriteSelected}
                              isNotSelected={
                                !noneSelected && !favouriteSelected
                              }
                              hideOptions={handleSelectNone}
                              viewPokemon={handleViewFavourite}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              </RootRef>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </ClickAwayListener>
  );
};

export default PokemonFavouritesList;
