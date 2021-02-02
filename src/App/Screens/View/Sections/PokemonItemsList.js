import React from "react";
import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  listMargin: {
    margin: "5%",
  },
  levelNumber: {
    fontWeight: "800",
    color: theme.palette.text.primary,
  },
  levelText: {
    fontSize: "0.65rem",
    fontWeight: "700",
    fontVariant: "small-caps",
    textShadow: "none",
    //"-1px -1px 0 #444, 1px -1px 0 #444, -1px 1px 0 #444, 1px 1px 0 #444",
    color: theme.palette.text.secondary,
  },
  backgroundTestColour: {
    backgroundColor: theme.palette.background.default,
  },
}));

const PokemonItemsList = ({ pokemonItems }) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <List className={classes.listMargin}>
      {pokemonItems.map((item, i) => (
        <div key={i}>
          <ListItem
            className={classes.backgroundTestColour}
            style={{
              //borderRadiusLeft: "22px",
              border: "1px solid " + theme.palette.background.senary,
              ...(i === 0
                ? {
                    //borderTop: "",
                    borderTopLeftRadius: "0.3em",
                    borderTopRightRadius: "0.3em",
                  }
                : i === pokemonItems.length - 1
                ? {
                    borderTop: "",
                    borderBottomLeftRadius: "0.3em",
                    borderBottomRightRadius: "0.3em",
                  }
                : { borderTop: "" }), //"0px solid #000"
            }}
            button
          >
            <ListItemText primary={item.name} secondary={item.type} />
          </ListItem>
        </div>
      ))}
    </List>
  );
};

export default PokemonItemsList;
