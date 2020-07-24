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
  animProps,
  onClick,
  IconComponent,
  auxShow,
  otherProps = {}
) => {
  const { placeholder, ...props } = otherProps;

  const modifiedDelayProps = {
    ...animProps,
    ...(placeholder ? { show: !(animProps.show && auxShow) } : {}),
  };
  return (
    <ControlButton
      {...{
        ...modifiedDelayProps,
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
};

function PokemonFavouritesControls({
  anim,
  displayContent,
  toggleSwitchMode,
  toggleDeleteMode,
  reorderFavourites,
  cancelReorderFavourites,
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

  const animProps1 = anim();
  const animProps2 = anim();

  const ControlButtonDefinitions = [
    [
      animProps1,
      toggleSwitchMode,
      SwapVerticalCircleTwoToneIcon,
      inDefaultMode,
    ],
    [animProps2, toggleDeleteMode, DeleteSweepTwoToneIcon, inDefaultMode],
    [
      animProps1,
      () => doReorder(toggleSwitchMode),
      CheckCircleTwoToneIcon,
      inSwitchMode,
      { style: { color: green[500] } },
    ],
    [
      animProps2,
      () => cancelReorder(toggleSwitchMode),
      CancelTwoToneIcon,
      inSwitchMode,
      { style: { color: red[500] } },
    ],
    [
      animProps1,
      () => doReorder(toggleDeleteMode),
      CheckCircleTwoToneIcon,
      inDeleteMode,
      { style: { color: green[500] } },
    ],
    [
      animProps2,
      () => cancelReorder(toggleDeleteMode),
      CancelTwoToneIcon,
      inDeleteMode,
      { style: { color: red[500] } },
    ],
    [
      animProps1,
      //placeholder!
      () => {},
      CancelTwoToneIcon,
      true,
      { style: { opacity: 0 }, placeholder: true },
    ],
  ];

  const ControlButtons = () =>
    ControlButtonDefinitions.map((buttonDef, index) =>
      MakeControlButton(index, theme, ...buttonDef)
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

const areEqual = (prevProps, nextProps) =>
  prevProps.displayContent === nextProps.displayContent &&
  prevProps.inDefaultMode === nextProps.inDefaultMode &&
  prevProps.inSwitchMode === nextProps.inSwitchMode &&
  prevProps.inDeleteMode === nextProps.inDeleteMode;

export default React.memo(PokemonFavouritesControls, areEqual);
