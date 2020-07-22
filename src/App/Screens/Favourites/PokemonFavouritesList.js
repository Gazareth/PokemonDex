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
  moveFavourite,
  anim,
  inSwitchMode,
  displayContent,
  isFavouriteSelected,
  handleSelectFavourite,
  handleSelectNone,
  handleViewFavourite,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const noneSelected = isFavouriteSelected(0);

  const onDragEnd = ({ destination, source, draggableId }) => {
    console.log("ondragend!!!", destination, source, draggableId);
    if (
      !destination ||
      destination.droppableId !== source.droppableId ||
      destination.index === source.index
    )
      return;

    console.log("DOING MOVE FAV!!!");
    moveFavourite(source.index, destination.index, parseInt(draggableId));
  };

  return (
    <ClickAwayListener onClickAway={handleSelectNone}>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
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
                        isDragDisabled={!inSwitchMode}
                        index={i}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className={classes.favouriteEntry}
                            onClick={
                              favouriteSelected || inSwitchMode
                                ? null
                                : handleSelectFavourite(fav.id)
                            }
                          >
                            <PokemonFavourite
                              {...anim()}
                              inSwitchMode={inSwitchMode}
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
