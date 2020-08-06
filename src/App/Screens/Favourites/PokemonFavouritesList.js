import React, { useEffect, useState, useCallback } from "react";

import Color from "color";

import RootRef from "@material-ui/core/RootRef";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Scrollbars } from "react-custom-scrollbars";
import Grid from "@material-ui/core/Grid";
import FlipMove from "react-flip-move";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PokemonFavourite from "./PokemonFavourite";

const useStyles = makeStyles((theme) => ({
  verticalTrack: {
    transition: "background-color 650ms ease-out 150ms",
    backgroundColor: Color(theme.palette.background.default)
      .lighten(0.3)
      .toString(),
    borderRadius: theme.spacing(2),
    height: "100%",
    top: 0,
    right: 0,
  },
  verticalTrackActive: {
    transition: "background-color 125ms ease-out",
    backgroundColor: Color(theme.palette.background.default)
      .darken(0.1)
      .desaturate(0.3)
      .lighten(0.2)
      .toString(),
  },
  verticalThumb: {
    transition: "background-color 350ms ease-in",
    backgroundColor: Color(theme.palette.background.septenary)
      .darken(0.2)
      .toString(),
    borderRadius: theme.spacing(2),
  },
  verticalThumbReady: {
    //transition: "background-color 125ms ease-out",
    backgroundColor: Color(theme.palette.background.octonary)
      .darken(0.2)
      .toString(),
  },
  verticalThumbActive: {
    transition: "background-color 125ms ease-in",
    backgroundColor: Color(theme.palette.background.nonary)
      .darken(0.35)
      .toString(),
  },
  listContainer: {
    paddingRight: theme.spacing(0.65),
  },
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

let scrollTimer = null;

const PokemonFavouritesList = ({
  anim,
  favourites,
  inDefaultMode,
  inSwitchMode,
  displayContent,
  isFavouriteSelected,
  handleSelectFavourite,
  handleSelectNone,
  handleViewFavourite,
  moveFavourite,
  removeFavourite,
  reorderFavourites,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [hovering, setHovering] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [flipMoveDisabled, setDisableFlipMove] = useState(false);

  const noneSelected = isFavouriteSelected(0);

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (
      !destination ||
      destination.droppableId !== source.droppableId ||
      destination.index === source.index
    )
      return;

    moveFavourite(source.index, destination.index, parseInt(draggableId));
    setDisableFlipMove(true);
  };

  useEffect(() => setDisableFlipMove(false), [favourites]);

  const moveSwapCallback = useCallback(
    (pokemonId, favouriteIndex) => (upDown) => {
      if (
        !(favouriteIndex === 0 && upDown) &&
        !(favouriteIndex + 1 === favourites.length && !upDown)
      ) {
        moveFavourite(
          favouriteIndex,
          favouriteIndex + (upDown ? -1 : 1),
          pokemonId
        );
        reorderFavourites();
      }
    },
    [favourites.length, moveFavourite, reorderFavourites]
  );

  return (
    <ClickAwayListener onClickAway={handleSelectNone}>
      <Grid
        item
        style={{ flex: "1" }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Scrollbars
          onScrollFrame={() => {
            setScrolling(true);
            scrollTimer = setTimeout(() => setScrolling(false), 500);
          }}
          // onScrollStart={() => setScrolling(true)}
          // onScrollStop={() => setScrolling(false)}
          renderTrackVertical={(props) => (
            <div
              {...props}
              className={clsx(classes.verticalTrack, {
                [classes.verticalTrackActive]: scrolling,
              })}
            />
          )}
          renderThumbVertical={({ style, ...props }) => {
            return (
              <div
                {...props}
                style={style}
                className={clsx(classes.verticalThumb, {
                  [classes.verticalThumbReady]: hovering,
                  [classes.verticalThumbActive]: scrolling,
                })}
              />
            );
          }}
        >
          <div className={classes.listContainer}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId={"PokemonFavouritesListDroppable"}
                style={{ paddingRight: "5rem" }}
              >
                {(provided) => (
                  <RootRef rootRef={provided.innerRef}>
                    <div
                      {...{
                        ...provided.droppableProps,
                        style: {
                          ...provided.droppableProps.style,
                          position: "relative",
                        },
                      }}
                    >
                      <FlipMove
                        typeName={null}
                        disableAllAnimations={flipMoveDisabled}
                      >
                        {favourites.map((fav, i) => {
                          const favouriteSelected = isFavouriteSelected(fav.id);

                          return (
                            <div key={fav.id}>
                              <Draggable
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
                                      favouriteSelected || !inDefaultMode
                                        ? null
                                        : handleSelectFavourite(fav.id)
                                    }
                                  >
                                    <PokemonFavourite
                                      {...{
                                        ...anim(),
                                        displayContent,
                                        inDefaultMode,
                                        inSwitchMode,
                                      }}
                                      dragHandleProps={provided.dragHandleProps}
                                      pokemonInfo={fav}
                                      favouriteIndex={i}
                                      isSelected={favouriteSelected}
                                      isNotSelected={
                                        !noneSelected && !favouriteSelected
                                      }
                                      hideOptions={handleSelectNone}
                                      viewPokemon={handleViewFavourite}
                                      moveSwapFavourite={moveSwapCallback(
                                        fav.id,
                                        i
                                      )}
                                      removeAsFavourite={() =>
                                        removeFavourite(fav.id)
                                      }
                                    />
                                  </div>
                                )}
                              </Draggable>
                            </div>
                          );
                        })}
                        {provided.placeholder}
                      </FlipMove>
                    </div>
                  </RootRef>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Scrollbars>
      </Grid>
    </ClickAwayListener>
  );
};

export default PokemonFavouritesList;
