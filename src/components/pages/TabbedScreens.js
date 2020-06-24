import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { connect } from "react-redux";
import { SEARCH_POKEMON } from "../../store/actions/types";

import useKeyDown from "hooks/KeyDown";
import useAnimEngine from "hooks/AnimEngine";

import clsx from "clsx";

import Grow from "@material-ui/core/Grow";

import SearchPage from "../Screens/Search";
import PokemonPage from "./subpages/pokemonPage/PokemonPage";
import FavouritesPage from "../Screens/Favourites";

import AppBar from "@material-ui/core/AppBar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import { PokeballIcon } from "../../icons/PokeballIcon";

const useStyles = makeStyles((theme) => ({
  appBarClass: {
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: "25px",
    overflow: "hidden",
    marginBottom: "1.25rem",
  },
  flexCol: {
    display: "flex",
    flexFlow: "column nowrap",
    flex: "auto",
    overflow: "hidden",
  },
  centerContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabsRoot: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: "25px",
  },
  tabIndicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#fff",
    },
  },
  //...tabIndicatorStyles,
  tabIndicatorLoading: {
    "& > span": {
      backgroundColor: "#dadada",
    },
  },
  svgRoot: {
    height: "1.95rem",
    transform: "scale(0.85)",
    margin: "0.5rem",
    fontSize: "1.95em",
    fill: theme.palette.text.disabled,
    transition:
      "font-size 0.325s cubic-bezier(.34,5.22,.52,1), transform 0.325s cubic-bezier(.34,5.22,.52,1)",
  },
  tabSelected: {
    fill: "#fff",
    filter: "drop-shadow(0 0 0.6rem white)",
    transform: "scale(1)",
  },
  tabSelectedLoading: {
    fill: "#dadada",
    filter: "none",
  },
}));

const AnimAppBar = AppBar;

const StyledTabs = (props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
);

const TabButtonIcon = ({
  iconComponent: IconComponent,
  animateIn,
  rootClasses,
}) => {
  return (
    console.log("Rendering icon component with rootClasses: ", rootClasses) || (
      <IconComponent classes={{ root: rootClasses }} />
    )
  );
};

const TabButton = ({
  currentIndex,
  iconComponent,
  displayContent,
  passedClasses,
  ariaLabel,
  ...props
}) => (
  <Tab
    fontSize="small"
    textColor="primary"
    icon={iconComponent}
    aria-label={ariaLabel}
    {...props}
  />
);

const MemoizedTabButton = React.memo(TabButton);

const TabPanel = (props) => {
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

const TabbedScreens = ({
  loadingState,
  havePokemon,
  pagePathIndex,
  setPagePathIndex,
}) => {
  const mainTheme = useTheme();
  const classes = useStyles(mainTheme);

  const mounted = useRef();
  const loadingTab = useRef(pagePathIndex);
  const [currentTab, setCurrentTab] = useState(pagePathIndex);
  const [displayContent, setDisplayContent] = useState(true);

  const tabsActions = useRef();

  //Handle change tab
  const changeTab = useCallback((newCurrentTab) => {
    setCurrentTab(newCurrentTab);
  }, []);

  const queueChangeTab = useCallback(
    (newCurrentTab) => {
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

  // //Handle key down
  // const handleLeftRight = useCallback(
  //   (event) => {
  //     if (!havePokemon) return false;
  //     switch (event.keyCode) {
  //       case 37:
  //         if (loadingTab.current > 0) setPagePathIndex(loadingTab.current - 1);
  //         break;
  //       case 39:
  //         if (loadingTab.current < 2) setPagePathIndex(loadingTab.current + 1);
  //         break;
  //       default:
  //         break;
  //     }
  //     if (event.keyCode === 27) {
  //       //Do whatever when esc is pressed
  //     }
  //   },
  //   [havePokemon, setPagePathIndex]
  // );

  // //Detect KeyDown
  // useKeyDown(handleLeftRight);

  //Detect loading state changed (to SEARCH_COMPLETE)
  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     if (loadingState === SEARCH_POKEMON.DONE) setPagePathIndex(1);
  //   }
  // }, [setPagePathIndex, loadingState]);

  // useEffect(() => {
  //   queueChangeTab(pagePathIndex);
  // }, [queueChangeTab, pagePathIndex]);

  const tabIconRootClasses = useMemo(
    () =>
      [0, 1, 2].map((i) =>
        clsx(
          classes.svgRoot,
          i === currentTab && [
            classes.tabSelected,
            !displayContent && classes.tabSelectedLoading,
          ]
        )
      ),
    [
      classes.svgRoot,
      classes.tabSelected,
      classes.tabSelectedLoading,
      currentTab,
      displayContent,
    ]
  );

  console.log("TabIconRootClasses: ", tabIconRootClasses);

  const anim = useAnimEngine(3, havePokemon, 450);

  return (
    <>
      <Grow
        in={
          havePokemon > 0 ||
          [
            SEARCH_POKEMON.FOUND,
            SEARCH_POKEMON.SPECIES_FOUND,
            SEARCH_POKEMON.MOVES_FOUND,
          ].includes(loadingState)
        }
        timeout={375}
        style={{
          minHeight: "unset",
          transitionTimingFunction: mainTheme.transitions.easing.pokeBounceIn,
        }}
        onEntered={() => tabsActions.current.updateIndicator()}
      >
        <AnimAppBar className={classes.appBarClass} position="static">
          <StyledTabs
            action={tabsActions}
            value={currentTab}
            onChange={(e, v) => setPagePathIndex(v)}
            {...{
              classes: {
                root: classes.tabsRoot,
                indicator: clsx(
                  classes.tabIndicator,
                  classes["tabIndicator-" + currentTab],
                  !displayContent && classes.tabIndicatorLoading
                ),
              },
            }}
            aria-label="select tab"
            variant="fullWidth"
          >
            {[
              [SearchIcon, "SEARCH"],
              [PokeballIcon, "POKEMON"],
              [StarIcon, "FAVOURITES"],
            ].map(([iconComponent, tabLabel], i) => {
              const isCurrentTab = currentTab === i;
              console.log(
                "Mapping tabButtons... i: ",
                i,
                " iconRootClasses: ",
                tabIconRootClasses[i]
              );
              return (
                <MemoizedTabButton
                  key={tabLabel + "_TAB_BUTTON"}
                  tabIndex={i}
                  currentIndex={currentTab}
                  ariaLabel={tabLabel}
                  passedClasses={classes}
                  iconComponent={
                    <TabButtonIcon
                      {...{ iconComponent }}
                      rootClasses={tabIconRootClasses[i]}
                      animateIn={isCurrentTab}
                    />
                  }
                />
              );
            })}
          </StyledTabs>
        </AnimAppBar>
      </Grow>
      {[SearchPage, PokemonPage, FavouritesPage].map((el, i) => (
        <TabPanel
          value={currentTab}
          key={i}
          index={i}
          passedClasses={clsx(classes.flexCol, classes.centerContent)}
        >
          {React.createElement(el, { displayContent })}
        </TabPanel>
      ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  loadingState: state.pokemon.loading,
  havePokemon: state.pokemon.haveData,
});

export default React.memo(connect(mapStateToProps)(TabbedScreens));
