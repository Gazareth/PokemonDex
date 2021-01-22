import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import SplitText from "react-pose-text";

import SmoothIn from "Utils/transitionSmoothIn";
import useAnimEngine from "Hooks/AnimEngine";

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    maxWidth: "70%",
    margin: "5% 0",
    backgroundColor: theme.palette.background.paper,
  },
  titleDot: {
    color: theme.palette.primary.main,
  },
}));

const creditsInfo = [
  [
    "PokeApi",
    require("Icons/PokeApi.png"),
    "API/Data",
    `PokeApi is a community maintained database interface for Pokémon data. It provides the main function of this app,
    The speed and range of information available through this app can be entirely credited to the PokeApi project.
    The wonderful team behind PokeApi have created a service which provides over 60,000,000 API requests each month!`,
  ],
  [
    "Material UI",
    "https://material-ui.com/static/logo_raw.svg",
    "JS Component/UI Framework",
    `Special thanks to all the wonderful folks who worked on this (and continue to!). 
    I've been following the release of v5 and honestly, the amount of work people put in is unbelievable.
    It's already a comprehensive library and framework, but more enhancements and improvements are always on the way.
    Despite the fact it's been around for years, it remains an exciting and contemporary project, and has both: inspired me to build things like this, whilst also saving me hundreds of hours in doing so!`,
  ],
  [
    "NPM - Node Package Manager",
    require("Icons/npm-logo.png"),
    `"build amazing things"`,
    `It's like walking on the shoulders of a million tiny giants.
    When I first found out about how npm worked, I couldn't believe something like that existed!
    People freely and seamlessly sharing their work, not just for others to look at, but to build more work off of, too!`,
  ],
  [
    "VS Code",
    require("Icons/Visual_Studio_Code_1.35_icon.png"),
    `"Code Editing. Redefined"`,
    `Microsoft's latest IDE Leaves little to be desired, in all aspects!
    We've all spent hours searching for the perfect IDE, and while I did really take to Sublime Text,
     it's not quite VS Code. Helps that it's completely free and Open Source, too!`,
    " — Do you have Paris recommendations? Have you ever…",
  ],
];

const headingCharPoses = {
  exit: { opacity: 0, y: 10, delay: 625 },
  enter: {
    y: 0,
    opacity: 1,
    transition: ({ charIndex, numChars }) => ({
      type: "spring",
      delay: 500 + (charIndex / numChars) * 625,
      stiffness: 5000 - 250 * Math.pow(charIndex / numChars, 0.5),
      damping: 1000,
    }),
  },
};

const CreditsAvatar = ({ title, img, isEven }) => (
  <ListItemAvatar>
    <img
      alt={title}
      src={img}
      style={{
        width: "10em",
      }}
    />
  </ListItemAvatar>
);

const CreditsEntry = SmoothIn(
  ({ title, img, subtitle, text, isEven, style }) => (
    <div style={style}>
      <ListItem style={{ margin: "2% 0", padding: "0 6%" }}>
        {isEven && <CreditsAvatar {...{ title, img, isEven }} />}
        <ListItemText
          style={{
            ...(isEven ? {} : { textAlign: "right" }),
            [`margin${isEven ? "Left" : "Right"}`]: "8%",
          }}
          primary={title}
          primaryTypographyProps={{ variant: "h6" }}
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
              {text}
            </>
          }
        />
        {!isEven && <CreditsAvatar {...{ title, img, isEven }} />}
      </ListItem>
      <Button></Button>
      <Divider variant="middle" component="li" />
    </div>
  )
);

const Credits = () => {
  const classes = useStyles();
  const anim = useAnimEngine(6, true, { delay: 1200, duration: 750 }, 200);

  return (
    <div className={classes.root} style={{ margin: "8% 0" }}>
      <Typography
        align="center"
        variant="h5"
        style={{ fontWeight: "bold" }}
        color="secondary"
      >
        <SplitText charPoses={headingCharPoses} initialPose="exit" pose="enter">
          Credits
        </SplitText>
      </Typography>
      <List style={{ marginTop: "8%" }}>
        {creditsInfo.map(([title, img, subtitle, text], i) => {
          const isEven = true || i % 2 === 0;
          return (
            <CreditsEntry
              key={i}
              {...{ title, img, subtitle, text, isEven, ...anim() }}
            />
          );
        })}
      </List>
    </div>
  );
};

export default Credits;
