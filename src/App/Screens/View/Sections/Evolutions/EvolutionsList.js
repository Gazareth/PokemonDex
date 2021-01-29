import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import Color from "color";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import PokeballIcon from "Icons/PokeballIcon";

import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import Avatar from "@material-ui/core/Avatar";

import pick from "Utils/pick";

const TOOLTIP_COOLDOWN = 450;

const useStyles = makeStyles((theme) => ({
  evolutionsListOuter: {
    height: "96px",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },
  evolButton: {
    position: "absolute",
    zIndex: 100,
    padding: theme.spacing(0.5),
    "& svg ": {
      fontSize: "1rem",
    },
  },
  evolButtonLeft: {
    transform: `translateX(${theme.spacing(-6)}px) rotate(0.5turn)`,
  },
  evolButtonRight: {
    transform: `translateX(${theme.spacing(6)}px)`,
  },
  evolutionEntry: {
    cursor: "pointer",
    position: "absolute",
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(1),
    width: theme.spacing(8),
    height: theme.spacing(8),
    transform: "translateX(0) scale(0.8)",
    transition: `transform 375ms ${theme.transitions.easing.pokeEase}, border 375ms ${theme.transitions.easing.pokeEase}`,
  },
  evolutionEntryInactive: {
    border: `2.85px solid ${Color(theme.palette.background.tertiary)
      .mix(Color(theme.palette.text.primary), 0.25)
      .string()}`,
    "&:hover": {
      filter:
        theme.palette.type === "dark" ? "brightness(1.35)" : "brightness(0.85)",
    },
  },
  evolutionEntryActive: {
    padding: theme.spacing(0.5),
    border: `4px solid ${Color(theme.palette.background.tertiary)
      .mix(Color(theme.palette.text.primary), 0.25)
      .string()}`,
    "&:hover": {
      filter:
        theme.palette.type === "dark" ? "brightness(1.35)" : "brightness(0.9)",
    },
  },
}));

const useStylesBootstrap = (shouldHide) =>
  makeStyles((theme) => ({
    arrow: {
      color: theme.palette.text.disabled,
    },
    tooltip: {
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.spacing(1),
      ...(shouldHide ? { filter: "opacity(0)", pointerEvents: "none" } : {}),
    },
  }));

const EvolutionTooltip = ({ id, name, isCurrent, toNewView }) => {
  const theme = useTheme();

  return (
    <div style={{ padding: isCurrent ? theme.spacing(2) : 0 }}>
      <div style={{ paddingBottom: isCurrent ? theme.spacing(2) : 0 }}>
        <Typography color="textPrimary">
          <span
            style={{
              color: theme.palette.text.secondary,
              fontWeight: "bold",
            }}
          >
            {`#${id} `}
          </span>
          {name}
        </Typography>
      </div>
      {isCurrent && (
        <div style={{ textAlign: "center" }}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={toNewView}
          >
            <PokeballIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

const interEvolutionPaddingFactor = 5; // % of remaining space to use as padding between each evolution
const PADDING_SELECTED = 75; // 75 each side

const newEvolution = (currentEvolution, direction) =>
  currentEvolution + (direction * 2 - 1);

const isAtEnd = (evolutionsLength, newEvolution) => {
  return [-1, evolutionsLength].includes(newEvolution);
};

const selectedPadding = (iDiff = 0) =>
  iDiff === 0 ? 0 : (Math.abs(iDiff) / iDiff) * PADDING_SELECTED;

const evolutionPosition = (iDiff, spread) =>
  selectedPadding(iDiff) + iDiff * spread;

const Evolution = ({
  evolIndex,
  id,
  img,
  name,
  isView,
  isSelect,
  toNewView,
  setSelected,
  canTooltip,
  tooltipCooldown,
  evolEntryClass,
  evolActiveClass,
  evolInactiveClass,
  positionOffset,
  evolScale,
}) => {
  const tooltipClasses = useStylesBootstrap(!canTooltip)();

  const setSelectedCB = useCallback(
    (evolIndex) => {
      tooltipCooldown();
      setSelected(evolIndex);
    },
    [setSelected, tooltipCooldown]
  );

  return (
    <Tooltip
      key={id}
      interactive={isSelect}
      //{...(!canTooltip ? { open: false } : {})}
      title={
        canTooltip && (
          <EvolutionTooltip
            id={id}
            name={name}
            isCurrent={isSelect}
            toNewView={() => toNewView(id)}
          />
        )
      }
      classes={tooltipClasses}
      arrow={canTooltip}
    >
      <Avatar
        alt={name}
        src={img}
        variant="rounded"
        component="div"
        className={clsx(
          evolEntryClass,
          isView ? evolActiveClass : evolInactiveClass
        )}
        style={{
          transform: `translateX(${positionOffset}px) scale(${
            isSelect ? 1 : evolScale
          })`,
          zIndex: isSelect ? 1 : Math.round(evolScale * 100),
        }}
        onClick={() => setSelectedCB(evolIndex)}
      />
    </Tooltip>
  );
};

/*** EVOLUTIONS ****/
const Evolutions = ({ viewingId, evolutions, classes, listWidth }) => {
  const [currentEvolution, setEvolution] = useState(
    evolutions.findIndex((evol) => evol.id === viewingId)
  );

  const [canTooltip, setCanTooltip] = useState(true);

  const tooltipCooldown = useCallback(() => {
    setCanTooltip(false);
    setTimeout(() => setCanTooltip(true), TOOLTIP_COOLDOWN);
  }, []);

  const history = useHistory();
  const toNewView = useCallback((id) => history.push(`/view/?id=${id}`), [
    history,
  ]);

  const spreadDist =
    (listWidth * 0.9 - 75 * 2) * (interEvolutionPaddingFactor / 100);

  const {
    evolutionEntry: evolEntryClass,
    evolutionEntryInactive: evolInactiveClass,
    evolutionEntryActive: evolActiveClass,
  } = classes;

  return (
    <>
      {evolutions.map((evolution, i) => {
        const iDiff = i - currentEvolution;
        const evolutionsOnSide = evolutions.filter((evo, j) =>
          iDiff > 0 ? j > currentEvolution : j < currentEvolution
        ).length; // how many evolutions on this side of the selected
        const evolutionsAhead = evolutions.filter((evo, j) =>
          iDiff > 0 ? j > i : j < i
        ).length;

        const evolutionExtend =
          (evolutionsOnSide - evolutionsAhead) / evolutionsOnSide; // how far along till the end is this evolution

        const evolScale =
          0.75 - (evolutionsOnSide === 1 ? 0 : 0.4 * evolutionExtend);

        const evolPosOffset = evolutionPosition(iDiff, spreadDist);

        return (
          <Evolution
            key={evolution.id}
            evolIndex={i}
            {...pick(evolution, ["id", "img", "name"])}
            isView={iDiff === 0}
            isSelect={i === currentEvolution}
            setSelected={setEvolution}
            toNewView={toNewView}
            {...{ canTooltip, tooltipCooldown }}
            {...{
              evolEntryClass,
              evolActiveClass,
              evolInactiveClass,
            }}
            positionOffset={evolPosOffset}
            evolScale={evolScale}
          />
        );
      })}
      {[
        {
          class: classes.evolButtonLeft,
          label: "Previous Evolution",
          component: PlayArrowIcon,
        },
        {
          class: classes.evolButtonRight,
          label: "Next Evolution",
          component: PlayArrowIcon,
        },
      ].map((buttonInfo, i) => {
        const nextEvolution = newEvolution(currentEvolution, i);
        const canScroll = !isAtEnd(evolutions.length, nextEvolution);
        return (
          <IconButton
            key={i}
            aria-label={buttonInfo.label}
            disabled={!canScroll}
            onClick={() => {
              if (canScroll) setEvolution(nextEvolution);
            }}
            className={clsx(classes.evolButton, buttonInfo.class)}
          >
            <buttonInfo.component />
          </IconButton>
        );
      })}
    </>
  );
};

export default function EvolutionsList({ pokemonId, pokemonEvolutions }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const listWidth = Math.min(theme.breakpoints.values.sm, window.innerWidth);

  return (
    <div className={classes.evolutionsListOuter}>
      <Evolutions
        {...{
          viewingId: pokemonId,
          evolutions: pokemonEvolutions,
          classes,
          listWidth,
        }}
      ></Evolutions>
    </div>
  );
}

EvolutionsList.propTypes = {
  post: PropTypes.object,
};
