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
  moveNameText: {
    fontWeight: "500",
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
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: theme.palette.background.septenary,
              ...(i === 0
                ? {
                    borderTopLeftRadius: "0.3em",
                    borderTopRightRadius: "0.3em",
                  }
                : i === pokemonItems.length - 1
                ? {
                    borderWidth: "0 1px 1px",
                    borderBottomLeftRadius: "0.3em",
                    borderBottomRightRadius: "0.3em",
                  }
                : { borderWidth: "0 1px 1px" }), //"0px solid #000"
            }}
            button
          >
            <ListItemText
              primary={item}
              classes={{ primary: classes.moveNameText }}
            />
          </ListItem>
        </div>
      ))}
    </List>
  );
};

PokemonItemsList.propTypes = {
  pokemonItems: PropTypes.array,
};

export default PokemonItemsList;
