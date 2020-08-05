import React from "react";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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

import { makeStyles, useTheme } from "@material-ui/core/styles";

import ControlCameraIcon from "@material-ui/icons/ControlCamera";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  movesButtonOuter: {
    margin: "0 15%",
  },
  movesButton: {
    backgroundColor: theme.palette.background.tertiary,
  },
}));

const MovesButton2 = ({ onClick }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Card className={classes.movesButton}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Moves
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            (34)
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const MovesButton = ({ onClick }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <List className={classes.movesButtonOuter}>
      <ListItem
        // classes={{
        //   root: classes["typeBackgroundColor-" + move.type],
        // }}
        classes={{ root: classes.movesButton }}
        button
        onClick={onClick}
      >
        <ListItemAvatar>
          <Avatar>
            <ControlCameraIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          //classes={{ secondary: classes["typeTextColor-" + move.type] }}
          primary={"Moves"}
          secondary={"(34)"}
        />
      </ListItem>
    </List>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PokemonMovesModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MovesButton onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Pokemon moves"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
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
    </div>
  );
};

export default PokemonMovesModal;
