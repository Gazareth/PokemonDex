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
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import PokemonMoves from "./PokemonDisplayMoves";

import useAnimEngine from "Hooks/AnimEngine";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import SvgIcon from "@material-ui/core/SvgIcon";

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
            <SvgIcon>
              <path
                fill="currentColor"
                d="M6.92,5H5L14,14L15,13.06M19.96,19.12L19.12,19.96C18.73,20.35 18.1,20.35 17.71,19.96L14.59,16.84L11.91,19.5L10.5,18.09L11.92,16.67L3,7.75V3H7.75L16.67,11.92L18.09,10.5L19.5,11.91L16.83,14.58L19.95,17.7C20.35,18.1 20.35,18.73 19.96,19.12Z"
              />
            </SvgIcon>
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

const PokemonMovesModal = ({ displayContent, pokemonMoves, show, delay }) => {
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
        //fullWidth
        //maxWidth={"sm"}
        TransitionComponent={ModalTransition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Pokemon moves"}
        </DialogTitle>
        <DialogContent>
          <PokemonMoves {...{ pokemonMoves, ...anim() }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PokemonMovesModal;
