import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import SmoothIn from "Utils/transitionSmoothIn";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  card: {
    background: theme.palette.background.quaternary,
    display: "flex",
    flex: 1,
  },
  cardDetails: {
    background: theme.palette.background.tertiary,
    flex: 1,
  },
  cardContent: {
    background: theme.palette.background.tertiary,
    "&:last-child": {
      padding: `${theme.spacing(1.5)}px`,
      textAlign: "right",
    },
  },
  image: {
    width: `${theme.spacing(10.75)}px`,
    height: `${theme.spacing(10.75)}px`,
  },
}));

const PokemonFavourite = ({
  pokemonInfo,
  isFavourite,
  addToFavourites,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  // return (
  //   <Card style={{ ...props.style }}>
  //     <CardActionArea>
  //       {/* <div className={classes.cardDetails}> */}
  //       <CardContent>
  //         {/* <Grid container direction="column"> */}
  //         {/* <Grid item> */}
  //         <Typography component="h2" variant="h5">
  //           <span
  //             style={{
  //               color: theme.palette.text.secondary,
  //             }}
  //           >
  //             {"#" + pokemonInfo.id + " "}
  //           </span>
  //           {pokemonInfo.name}
  //         </Typography>
  //         {/* </Grid> */}
  //         {/* <Grid item> */}
  //         <Typography variant="subtitle2" className={classes.types}>
  //           {pokemonInfo.types.map((type, i) => (
  //             <span key={i}>
  //               <span
  //                 style={{
  //                   color: theme.palette.pokemonTypes[type],
  //                 }}
  //               >
  //                 {type}
  //               </span>
  //               <>{i + 1 === pokemonInfo.types.length ? "" : ", "}</>
  //             </span>
  //           ))}
  //         </Typography>
  //         {/* </Grid> */}
  //         {/* </Grid> */}
  //       </CardContent>
  //       {/* <Grid item xs={2}>
  //           <Box display="flex" alignItems="center">
  //             <img
  //               src={pokemonInfo.image}
  //               className={classes.image}
  //               alt={pokemonInfo.name}
  //             />
  //           </Box>
  //         </Grid> */}
  //       {/* </div> */}
  //     </CardActionArea>
  //   </Card>
  // );
};

export default SmoothIn(PokemonFavourite);
