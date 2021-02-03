/* MIA - Moves, Items, Abilities */

import React from "react";

import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grow from "@material-ui/core/Grow";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import startCase from "lodash/startCase";

import PokemonMIAModal from "./PokemonDisplayMIAModal";

import ListAltIcon from "@material-ui/icons/ListAlt";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import FlareIcon from "@material-ui/icons/Flare";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

import SmoothIn from "Utils/transitionSmoothIn";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  miaButtonOuter: {
    //margin: "0 15%",
    flex: 1,
  },
  miaButton: {
    borderRadius: theme.spacing(0.5),
    ...theme.panelStyles,
    ...theme.panelBorder,
    "&:hover": {
      backgroundColor: theme.palette.background.quaternary,
    },
  },
}));

const MiaIcons = {
  moves: ListAltIcon,
  items: BeachAccessIcon,
  abilities: FlareIcon,
};

const MiaIcon = ({ variant }) => {
  const Icon = get(MiaIcons, variant);

  return <Icon />;
};

const MiaButton = SmoothIn(({ onClick, variant, style, pokemonMIAData }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <List className={classes.miaButtonOuter} {...{ style }}>
      <ListItem
        classes={{ root: classes.miaButton }}
        button
        disabled={isEmpty(pokemonMIAData)}
        onClick={onClick}
      >
        <ListItemAvatar>
          <Avatar>
            <MiaIcon {...{ variant }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={startCase(variant)}
          secondary={`(${pokemonMIAData.length})`}
        />
      </ListItem>
    </List>
  );
});

const ModalTransition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const PokemonMIA = ({ pokemonName, variant, pokemonMIAData, show, delay }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MiaButton
        {...{ show, delay, variant, pokemonMIAData }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        fullWidth
        maxWidth={"sm"}
        TransitionComponent={ModalTransition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{pokemonName}</DialogTitle>
        <DialogContent>
          <PokemonMIAModal {...{ variant, pokemonMIAData }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PokemonMIA;
