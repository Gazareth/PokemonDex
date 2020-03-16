import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { SEARCH_POKEMON } from "../../store/actions/types";

import useKeyDown from "../../hooks/KeyDown";

import clsx from "clsx";

import PokemonPage from "./subpages/pokemonPage/PokemonPage";
import SearchPage from "./subpages/searchPage/SearchPage";

import AppBar from "@material-ui/core/AppBar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import { PokeballIcon } from "../../icons/PokeballIcon";

const useStyles = makeStyles(theme => ({
  appBarClass: {
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: "25px"
  },
  flexCol: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "auto",
    overflow: "hidden"
  },
  centerContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  tabsRoot: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: "25px"
  },
  tabIndicator: {
    backgroundColor: "#fff"
  },
  svgRoot: {
    height: "1.95rem",
    transform: "scale(1)",
    margin: "0.5rem",
    fill: theme.palette.text.disabled
  },
  tabSelected: {
    fill: "#fff",
    filter: "drop-shadow(0 0 0.6rem white)",
    fontSize: "1.95em",
    transition: "font-size 0.325s cubic-bezier(.34,5.22,.52,1)"
  }
}));

const TabComponents = (elements, tabIndex, classes) =>
  elements.map((el, i) => (
    <Tab
      key={i}
      fontSize="small"
      icon={React.createElement(el[0], {
        classes: {
          root: clsx(classes.svgRoot, tabIndex === i && classes.tabSelected)
        },
        pokealt: tabIndex === i ? "true" : ""
      })}
      aria-label={el[1]}
    />
  ));

const TabPanel = props => {
  const { children, value, index, passedClasses, ...other } = props;
  const isSelected = value === index;
  const flexClasses = clsx(isSelected && passedClasses);

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={!isSelected}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={flexClasses}
      {...other}
    >
      {isSelected && (
        <Box className={flexClasses} p={3}>
          {children}
        </Box>
      )}
    </Typography>
  );
};

const TabbedScreens = ({ loadingState }) => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);
  const mounted = useRef();
  const [loadingTab, setLoadingTab] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [displayContent, setDisplayContent] = useState(true);

  //Handle change tab
  let switchTabsTimer;

  const changeTab = useCallback(
    newCurrentTab => setCurrentTab(newCurrentTab),
    []
  );

  const queueChangeTab = newCurrentTab => {
    if (newCurrentTab === currentTab) return false;
    setLoadingTab(newCurrentTab);
    setDisplayContent(false);
    clearTimeout(switchTabsTimer);
    switchTabsTimer = setTimeout(() => {
      setDisplayContent(true);
      changeTab(newCurrentTab);
    }, 750);
  };

  //Handle key down
  const handleLeftRight = useCallback(
    event => {
      switch (event.keyCode) {
        case 37:
          if (loadingTab > 0) queueChangeTab(loadingTab => loadingTab - 1);
          break;
        case 39:
          if (loadingTab < 2) queueChangeTab(loadingTab => loadingTab + 1);
          break;
        default:
          break;
      }
      if (event.keyCode === 27) {
        //Do whatever when esc is pressed
      }
    },
    [loadingTab]
  );

  //Detect KeyDown
  useKeyDown(handleLeftRight);

  //Detect loading state changed
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (loadingState === SEARCH_POKEMON.DONE) queueChangeTab(1);
    }
  }, [loadingState]);

  return (
    <>
      <AppBar className={classes.appBarClass} position="static">
        <Tabs
          value={currentTab}
          onChange={(e, v) => queueChangeTab(v)}
          variant="fullWidth"
          {...{
            classes: { root: classes.tabsRoot, indicator: classes.tabIndicator }
          }}
          aria-label="select tab"
        >
          {TabComponents(
            [
              [SearchIcon, "SEARCH"],
              [PokeballIcon, "POKEMON"],
              [StarIcon, "FAVOURITES"]
            ],
            currentTab,
            classes
          )}
        </Tabs>
      </AppBar>
      {[SearchPage, PokemonPage].map((el, i) => (
        <TabPanel
          value={currentTab}
          key={i}
          index={i}
          passedClasses={clsx(classes.flexCol, classes.centerContent)}
        >
          {React.createElement(el, { displayContent })}
        </TabPanel>
      ))}
      <TabPanel
        value={currentTab}
        index={2}
        passedClasses={classes.centerContent}
      >
        Favourite Pokemon... coming soon!
      </TabPanel>
    </>
  );
};

const mapStateToProps = state => {
  return { loadingState: state.pokemon.loading };
};

export default connect(mapStateToProps)(TabbedScreens);
