import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import SearchIcon from "@material-ui/icons/Search";
import PokeballIcon from "Icons/PokeballIcon";
import GradeTwoToneIcon from "@material-ui/icons/GradeTwoTone";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import SmoothIn from "Utils/transitionSmoothIn";
import useAnimEngine from "Hooks/AnimEngine";
import clsx from "clsx";

import pick from "lodash/pick";
import values from "lodash/values";

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    maxWidth: "70%",
    margin: "6vh 0",
    padding: "4vh 4vw",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      marginRight: "0",
    },
    border: "none",
    boxShadow: "none",
  },
  avatar: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  headingText: {
    animation: `$fadeIn 750ms ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  sectionHeading: {
    fontSize: "1.5rem",
    fontWeight: "600",
    textAlign: "center",
    marginRight: "18.8%",
    marginBottom: "3vh",
  },
  sectionHeadingRight: {
    paddingRight: "10%",
  },
  sectionHeadingLeft: {
    paddingLeft: "10%",
  },
}));

const Li = (props) => (
  <li style={{ ...props.style, paddingBottom: "1.5rem" }}>{props.children}</li>
);

const howToInfo = [
  [
    "Search",
    {
      component: SearchIcon,
      props: { color: "primary", style: { fontSize: "48px" } },
    },
    "",
    <ol style={{ listStyle: "disclosure-closed" }}>
      <Li>
        <strong>Click</strong> on the search panel or search input field to
        start inputting text.
      </Li>
      <Li>
        Type a Pokémon name or ID and press <strong>[ENTER]</strong> to submit
        your entry.
      </Li>
      <Li>
        The search will start and progress through several stages before being
        ready to show you information about the Pokémon you've chosen to view.
      </Li>
    </ol>,
  ],
  [
    "View",
    {
      component: PokeballIcon,
      props: { color: "secondary", style: { fontSize: "48px" } },
    },
    "",
    <ol style={{ listStyle: "disclosure-closed" }}>
      <Li>
        The <strong>View</strong> screen shows a variety of information about
        your chosen Pokémon. The first section is the most dense, containing the
        name; types; weight & height; As well as an image showing what the
        Pokémon looks like. You can also see if this Pokémon is saved as one of
        your favourites by observing the ⭐ icon. A gold fill indicates this is
        one of your favourites.
      </Li>
      <Li>
        Below the main information card are the <strong>'Stats'</strong>and{" "}
        <strong>'Species Info'</strong> panels. These are self-explanatory.
      </Li>
      <Li>
        Click on <strong>'Moves'</strong> to view a list of the Moves the
        selected Pokémon will learn naturally as they level up. The level at
        which each move is learned is also shown.
      </Li>
      <Li>
        The <strong>'Evolutions'</strong> section shows the Pokémon's evolution
        chain, and where it fits into the sequence. You can find out the names
        of each of the Pokémon in the chain by hovering on them, and you can
        click on them to bring them into focus. When an evolution is in focus,
        you can click the <strong>"View"</strong> button in its tooltip to make
        them the current Pokémon.
      </Li>
      <Li>
        Finally, you can navigate to the <strong>next</strong> or{" "}
        <strong>previous</strong> entry in the <strong>National Pokédex</strong>
        , using the arrows either side of the ID for the current Pokémon, shown
        at the bottom of the <strong>View</strong> panel.
      </Li>
    </ol>,
  ],
  [
    "Favourites",
    {
      component: GradeTwoToneIcon,
      props: { style: { fontSize: "48px", color: "#ffb74d" } },
    },
    "",
    <ol style={{ listStyle: "disclosure-closed" }}>
      <Li>
        The <strong>Favourites</strong> screen is where you can view and manage
        the Pokémon you have assigned to be saved as your favourites.
      </Li>
      <Li>You can reorder, view or delete your favourites.</Li>
      <Li>
        There are <strong>two</strong> methods for reordering your favourites -{" "}
        <strong>Drag & drop</strong>, or <strong>switch.</strong>
      </Li>
      <Li>
        To use <strong>switch</strong> reordering, first click on the Pokémon,
        then a new set of buttons will appear. From these buttons you can choose
        to move a Pokémon up or down.
      </Li>
      <Li>
        To use <strong>Drag & drop</strong>, click the 🔀 dual arrows icon at
        the top of the screen, on the right, directly above the list of your
        favourites. This will engage <strong>Drag & drop mode.</strong> from
        here you can click and hold on any of your Pokémon and move them around
        in the list. Once you have finished you can exist this mode by either
        confirming or cancelling your changes using the ✔️ or ❌ buttons at the
        top of the screen, in the center, directly above the list of your
        favourites.
      </Li>
      <Li>
        <strong>Delete mode</strong> is similar to <strong>Drag & drop</strong>,
        instead clicking the 🗑️ icon above the favourites list. Each Pokémon
        entry in the list will now have its own individual 🗑️ icon, and this
        must be clicked to assign deletion to a Pokémon. Once you've finished,
        you must click the ✔️ or ❌ buttons above the list to confirm or cancel
        your changes.
      </Li>
      <Li>
        You can also go directly from the favourites page to the{" "}
        <strong>View</strong> page using the pill-shaped button with the
        Pokéball on it. You must first select one of your favourites by clicking
        on them, then, some additional buttons will appear.
      </Li>
    </ol>,
  ],
];

const HowToAvatar = ({ title, classes, ImageComponent }) => (
  <ListItemAvatar classes={classes}>
    <ImageComponent.component {...ImageComponent.props} />
  </ListItemAvatar>
);

const HowToEntry = SmoothIn(
  ({
    title,
    ImageComponent,
    subtitle,
    text,
    link,
    isLast,
    style,
    sectionHeadingClass,
  }) => {
    const classes = useStyles();

    return (
      <div style={style}>
        <ListItem style={{ margin: "2% 0", padding: "0 6%" }}>
          <HowToAvatar
            {...{ title, ImageComponent }}
            classes={{ root: classes.avatar }}
          />
          <ListItemText
            component="div"
            style={{
              marginLeft: "8%",
              fontSize: "5rem",
            }}
            classes={{
              primary: clsx(values(pick(classes, ["sectionHeading"]))),
            }}
            primary={title}
            primaryTypographyProps={{ variant: "h6" }}
            secondaryTypographyProps={{ component: "div" }}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  style={{ display: "inline" }}
                  color="textPrimary"
                >
                  {subtitle}
                  <br />
                </Typography>
                <div>{text}</div>
                <br />
                {link && (
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                    // style={{marginTop: 5px}}
                  >
                    Link
                  </Button>
                )}
              </>
            }
          />
        </ListItem>
        <Button></Button>
        {!isLast && <Divider variant="middle" component="li" />}
      </div>
    );
  }
);

const HowToUse = () => {
  const classes = useStyles();
  const anim = useAnimEngine(6, true, { delay: 500, duration: 775 }, 225);

  return (
    <>
      <Paper className={classes.root}>
        <Typography
          align="center"
          variant="h5"
          style={{ fontWeight: "bold" }}
          color="primary"
          className={classes.headingText}
        >
          How To Use
        </Typography>
        <Container>
          <List style={{ marginTop: "6vh" }}>
            {howToInfo.map(
              ([title, ImageComponent, subtitle, text, link], i) => {
                return (
                  <HowToEntry
                    key={i}
                    {...{
                      title,
                      ImageComponent,
                      subtitle,
                      text,
                      link,
                      isLast: i === howToInfo.length - 1,
                      ...anim(),
                    }}
                  />
                );
              }
            )}
          </List>
        </Container>
      </Paper>
      <div>&nbsp;</div>
    </>
  );
};

export default HowToUse;
