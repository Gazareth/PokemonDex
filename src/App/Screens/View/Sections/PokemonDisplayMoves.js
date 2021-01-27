import React from "react";

import Button from "@material-ui/core/Button";

import SmoothIn from "Utils/transitionSmoothIn";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import PokemonMoves from "./PokemonDisplayMovesModal";

import useAnimEngine from "Hooks/AnimEngine";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import ListAltIcon from "@material-ui/icons/ListAlt";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  movesButtonOuter: {
    margin: "0 15%",
    flex: 1,
  },
  movesButton: {
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.background.tertiary,
    filter: `drop-shadow(0px 2px 10px ${theme.palette.background.default})`,
  },
}));

const MovesButton = SmoothIn(({ onClick, style }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <List className={classes.movesButtonOuter} {...{ style }}>
      <ListItem
        classes={{ root: classes.movesButton }}
        button
        onClick={onClick}
      >
        <ListItemAvatar>
          <Avatar>
            <ListAltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Moves"} secondary={"(34)"} />
      </ListItem>
    </List>
  );
});

const ModalTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PokemonMovesModal = ({
  displayContent,
  pokemonName,
  pokemonMoves,
  show,
  delay,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const anim = useAnimEngine(4, displayContent);

  return (
    <>
      <MovesButton {...{ show, delay }} onClick={handleClickOpen} />
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
          <PokemonMoves {...{ pokemonMoves, ...anim() }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PokemonMovesModal;
