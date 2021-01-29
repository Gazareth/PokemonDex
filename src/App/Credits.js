import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
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

const headingCharPoses = {
  exit: { opacity: 0, y: 10, delay: 625 },
  enter: {
    y: 0,
    opacity: 1,
    transition: ({ charIndex, numChars }) => ({
      type: "spring",
      delay: 375 + charIndex * 45,
      stiffness: 4000, // - 499 * (charIndex / numChars),
      damping: 100, // + 100 * Math.pow(charIndex / numChars, 0.5),
    }),
  },
};

const creditsInfo = [
  [
    "PokeApi",
    require("Icons/PokeApi.png"),
    "API/Data",
    `PokeApi is a community maintained database interface for Pokémon data. It provides the main function of this app,
    The speed and range of information available through this app can be entirely credited to the PokeApi project.
    The wonderful team behind PokeApi have created a service which provides over 60,000,000 API requests each month!`,
    "https://pokeapi.co/",
  ],
  [
    "Material UI",
    "https://material-ui.com/static/logo_raw.svg",
    "JS Component/UI Framework",
    `Special thanks to all the wonderful folks who worked on this (and continue to!). 
    I've been following the release of v5 and honestly, the amount of work people put in is unbelievable.
    It's already a comprehensive library and framework, but more enhancements and improvements are always on the way.
    Despite the fact it's been around for years, it remains an exciting and contemporary project, and has both: inspired me to build things like this, whilst also saving me hundreds of hours in doing so!`,
    "https://material-ui.com/",
  ],
  [
    "React JS",
    require("Icons/React-icon.png"),
    `"A JavaScript library for building user interfaces"`,
    `The foundation of modern web development, react enables a declarative coding style with powerful and intuitive customisability which led 
    to its well deserved position as the top dog of modern JS frameworks. It is a joy to use and can take all the credit for my ever getting properly into web development!
    Something worth mentioning as well is that it all came out of facebook! (But is of course, like the rest, free and open source!)`,
    "https://reactjs.org/",
  ],
  [
    "NPM - Node Package Manager",
    require("Icons/npm-logo.png"),
    `"build amazing things"`,
    `It's like walking on the shoulders of a million tiny giants.
    When I first found out about how npm worked, I couldn't believe something like that existed!
    People freely and seamlessly sharing their work, not just for others to look at, but to build more work off of, too!`,
    "https://www.npmjs.com/",
  ],
  [
    "VS Code",
    require("Icons/Visual_Studio_Code_1.35_icon.png"),
    `"Code Editing. Redefined"`,
    `Microsoft's latest IDE Leaves little to be desired, in all aspects!
    We've all spent hours searching for the perfect IDE, and while I did really take to Sublime Text,
     it's not quite VS Code. Helps that it's completely free and Open Source, too!`,
    "https://code.visualstudio.com/",
  ],
  [
    "react-beautiful-dnd",
    require("Icons/ReactBeautifulDndIcon.png"),
    `"Beautiful and accessible drag and drop for lists with React"`,
    `I stumbled upon this sneaky little devil as I was searching for a drag & drop React solution, and it truly goes above and beyond.
    Its feature set is inspiring; the fine folks working on this have implemented incredibly smooth animations for switching, adding, removing items, and that's just the beginning.
    You'll also find auto scrolling the list when you're near the bottom, AND the ability to move items between multiple separate lists!`,
    "https://github.com/atlassian/react-beautiful-dnd",
  ],
  [
    "flaticon",
    require("Icons/flatIconIcon.svg"),
    `"The largest database of free icons available in PNG, SVG, EPS, PSD and BASE 64 formats."`,
    `Pretty cool icons website where I found the Pokédex icon. It doesn't appear to be there anymore so I can't give proper credit ☹️`,
    "https://www.flaticon.com",
  ],
  [
    "Pose JS",
    require("Icons/pose-js-icon.png"),
    `"A truly simple animation library for React, React Native, and Vue"`,
    `This is how you animate text.`,
    "https://popmotion.io/pose/",
  ],
];

const CreditsAvatar = ({ title, img }) => (
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
  ({ title, img, subtitle, text, link, isEven, style }) => (
    <div style={style}>
      <ListItem style={{ margin: "2% 0", padding: "0 6%" }}>
        <CreditsAvatar {...{ title, img }} />
        <ListItemText
          style={{
            marginLeft: "8%",
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
              <p>{text}</p>
              <br />
              {link && (
                <Button
                  variant="contained"
                  color="primary"
                  href={link}
                  target="_blank"
                >
                  Link
                </Button>
              )}
            </>
          }
        />
      </ListItem>
      <Button></Button>
      <Divider variant="middle" component="li" />
    </div>
  )
);

const Credits = () => {
  const classes = useStyles();
  const anim = useAnimEngine(6, true, { delay: 850, duration: 775 }, 225);

  return (
    <div className={classes.root} style={{ margin: "8vh 0" }}>
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
      <Container>
        <Typography>
          <List style={{ marginTop: "6vh" }}>
            {creditsInfo.map(([title, img, subtitle, text, link], i) => {
              const isEven = i % 2 === 0;
              return (
                <CreditsEntry
                  key={i}
                  {...{ title, img, subtitle, text, link, isEven, ...anim() }}
                />
              );
            })}
          </List>
        </Typography>
      </Container>
    </div>
  );
};

export default Credits;
