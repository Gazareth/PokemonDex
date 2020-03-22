import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { SEARCH_POKEMON } from "../../store/actions/types";

import useKeyDown from "hooks/KeyDown";
import useAnimEngine from "hooks/AnimEngine";

import clsx from "clsx";

import SmoothIn from "util/transitionSmoothIn";

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
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      width: "100%",
      backgroundColor: "#fff"
    }
  },
  //...tabIndicatorStyles,
  tabIndicatorLoading: {
    "& > div": {
      backgroundColor: "#dadada"
    }
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
  },
  tabSelectedLoading: {
    fill: "#dadada",
    filter: "none"
  }
}));

const AnimAppBar = SmoothIn(AppBar);

const StyledTabs = props => (
  <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />
);

const TabComponents = (elements, tabIndex, displayContent, classes) =>
  elements.map((el, i) => (
    <Tab
      key={i}
      fontSize="small"
      icon={React.createElement(el[0], {
        classes: {
          root: clsx(
            classes.svgRoot,
            tabIndex === i && [
              classes.tabSelected,
              !displayContent && classes.tabSelectedLoading
            ]
          )
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

let switchTabsTimer = null;

const TabbedScreens = ({ loadingState, havePokemon }) => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);
  const mounted = useRef();
  const loadingTab = useRef(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [displayContent, setDisplayContent] = useState(true);

  //Handle change tab
  const changeTab = useCallback(
    newCurrentTab => setCurrentTab(newCurrentTab),
    []
  );

  const queueChangeTab = useCallback(
    newCurrentTab => {
      if (
        switchTabsTimer ||
        newCurrentTab === currentTab ||
        newCurrentTab === loadingTab.current
      )
        return false;
      loadingTab.current = newCurrentTab;
      setDisplayContent(false);
      switchTabsTimer = setTimeout(() => {
        setDisplayContent(true);
        changeTab(newCurrentTab);
        switchTabsTimer = null;
      }, process.env.REACT_APP_TABSWITCHTIME);
    },
    [changeTab, currentTab]
  );

  //Handle key down
  const handleLeftRight = useCallback(
    event => {
      switch (event.keyCode) {
        case 37:
          if (loadingTab.current > 0) queueChangeTab(loadingTab.current - 1);
          break;
        case 39:
          if (loadingTab.current < 2) queueChangeTab(loadingTab.current + 1);
          break;
        default:
          break;
      }
      if (event.keyCode === 27) {
        //Do whatever when esc is pressed
      }
    },
    [queueChangeTab]
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
  }, [queueChangeTab, loadingState]);

  const anim = useAnimEngine(3, havePokemon, 450);

  return (
    <>
      <AnimAppBar
        {...anim()}
        doHeight
        className={classes.appBarClass}
        position="static"
      >
        <StyledTabs
          value={currentTab}
          onChange={(e, v) => queueChangeTab(v)}
          variant="fullWidth"
          {...{
            classes: {
              root: classes.tabsRoot,
              indicator: clsx(
                classes.tabIndicator,
                classes["tabIndicator-" + currentTab],
                !displayContent && classes.tabIndicatorLoading
              )
            }
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
            displayContent,
            classes
          )}
        </StyledTabs>
      </AnimAppBar>
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

const mapStateToProps = state => ({
  loadingState: state.pokemon.loading,
  havePokemon: state.pokemon.haveData
});

export default connect(mapStateToProps)(TabbedScreens);
