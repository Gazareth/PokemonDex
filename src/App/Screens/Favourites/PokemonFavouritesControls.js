import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { useTheme } from "@material-ui/core/styles";

import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";

import SmoothIn from "Utils/transitionSmoothIn";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import SwapVerticalCircleTwoToneIcon from "@material-ui/icons/SwapVerticalCircleTwoTone";
import DeleteSweepTwoToneIcon from "@material-ui/icons/DeleteSweepTwoTone";

import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";

/* FOR REFERENCE:
        <ControlButton
          {...anim()}
          onClick={toggleSwitchMode}
          IconComponent={SwapVerticalCircleTwoToneIcon}
          transitionType="Bounce"
          theme={theme}
          auxShow={inSwitchMode}
        />
        <ControlButton
          {...anim()}
          onClick={toggleDeleteMode}
          IconComponent={DeleteSweepTwoToneIcon}
          transitionType="Bounce"
          theme={theme}
        />
      </>
*/

const ControlButton = SmoothIn(
  ({ classes, IconComponent, hideOptions, style, ...props }) => (
    <IconButton style={style} onClick={() => hideOptions()} {...props}>
      <IconComponent fontSize="large" />
    </IconButton>
  )
);

//const MakeControlButtons = (ButtonsArr) =>
const MakeControlButton = (
  key,
  theme,
  anim,
  onClick,
  IconComponent,
  auxShow,
  props = {}
) => (
  <ControlButton
    {...{
      ...anim(),
      key,
      onClick,
      IconComponent,
      transitionType: "Bounce",
      theme,
      auxShow,
      unmountOnExit: true,
      mountOnEnter: true,
      ...props,
    }}
  />
);

function PokemonFavouritesControls({
  anim,
  toggleSwitchMode,
  toggleDeleteMode,
  reorderFavourites,
  cancelReorderFavourites,
  onClickDeleteCancel,
  inDefaultMode,
  inSwitchMode,
  inDeleteMode,
}) {
  const theme = useTheme();

  const doReorder = useCallback(
    (toggleMode) => {
      reorderFavourites();
      toggleMode();
    },
    [reorderFavourites]
  );

  const cancelReorder = useCallback(
    (toggleMode) => {
      cancelReorderFavourites();
      toggleMode();
    },
    [cancelReorderFavourites]
  );

  const ControlButtonDefinitions = [
    [toggleSwitchMode, SwapVerticalCircleTwoToneIcon, inDefaultMode],
    [toggleDeleteMode, DeleteSweepTwoToneIcon, inDefaultMode],
    [
      () => doReorder(toggleSwitchMode),
      CheckCircleTwoToneIcon,
      inSwitchMode,
      { style: { color: green[500] } },
    ],
    [
      () => cancelReorder(toggleSwitchMode),
      CancelTwoToneIcon,
      inSwitchMode,
      { style: { color: red[500] } },
    ],
    [
      () => doReorder(toggleDeleteMode),
      CheckCircleTwoToneIcon,
      inDeleteMode,
      { style: { color: green[500] } },
    ],
    [
      () => cancelReorder(toggleDeleteMode),
      CancelTwoToneIcon,
      inDeleteMode,
      { style: { color: red[500] } },
    ],
  ];

  const ControlButtons = () =>
    ControlButtonDefinitions.map((buttonDef, index) =>
      MakeControlButton(index, theme, anim, ...buttonDef)
    );

  return (
    <Grid container direction="column">
      <Grid
        item
        container
        //xs={4}
        justify={inDefaultMode ? "flex-end" : "center"}
      >
        <ControlButtons />
      </Grid>
    </Grid>
  );
}

PokemonFavouritesControls.propTypes = {};

export default PokemonFavouritesControls;
