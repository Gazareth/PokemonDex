import React, { useState } from "react";
import { connect } from "react-redux";

import { useHistory, useLocation } from "react-router";

import clsx from "clsx";
import Color from "color";

import { setThemeMode } from "Store/actions";

import useThemedClasses from "Contexts/ThemedClasses";

import pick from "Utils/pick";

import Grid from "@material-ui/core/Grid";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";

import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";

import PokedexSVG from "Icons/PokedexIconV2";

import PokeballIcon from "Icons/PokeballIcon";
import SearchIcon from "@material-ui/icons/Search";
import GradeTwoToneIcon from "@material-ui/icons/GradeTwoTone";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import { POKEMON_DEX_PATHS as PokemonDexURLs } from "Constants";

const pathIdMatch = (path, id) =>
  PokemonDexURLs.findIndex((urlPath) => path.includes(urlPath)) === id;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  drawerList: {
    width: 250,
  },
  appBar: {
    position: "relative",
  },
  logoTitle: {
    //flexGrow: 0.5,
    height: "100%",
  },
  logoButton: {
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      margin: "3px",
    },
    //marginRight: theme.spacing(1.5),
  },
  title: {
    display: "flex",
    alignSelf: "center",
    paddingLeft: theme.spacing(1.5),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  navIconInactive: {
    transform: "scale(0.95)",
    color: theme.palette.text.secondary,
  },
  navIconActive: {
    //color: theme.palette.primary.light,
    backgroundColor: Color(theme.palette.text.disabled).fade(0.75).toString(),
    "&:hover": {
      backgroundColor: Color(theme.palette.text.disabled).fade(0.65).toString(),
    },
  },
  navIconSearchActive: {
    color: theme.palette.info.light,
  },
  navIconViewActive: {
    color: theme.palette.secondary.light,
  },
  navIconFavouritesActive: {
    color: theme.palette.warning.light,
  },
  switchContainer: {
    display: "flex",
    //flexGrow: 0.5,
    justifyContent: "flex-end",
  },
  switchForm: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  switchBase: {
    color: theme.palette.primary.dark,
    "&$checked": {
      color: theme.palette.warning.light,
    },
    "&$checked + $track": {
      backgroundColor: theme.palette.warning.light,
    },
  },
  checked: {},
  track: {},
});

const DarkLightIcon = ({ theme, themeMode }) => {
  const mode = themeMode === "light" ? 1 : 0;
  const findColor = (colors) =>
    [colors.primary.dark, colors.warning.light][mode];
  const styles = {
    style: { color: findColor(theme.palette) },
  };
  const Component = [Brightness4Icon, Brightness5Icon][mode];
  return <Component {...styles} />;
};

const NavIconButton = ({
  classNameActive,
  classNameInactive,
  classNameActiveSpecial,
  navId,
  navPath,
  currentPath,
  navFunc,
  disabled,
  iconComponent: IconComponent,
}) => {
  const isActive = pathIdMatch(currentPath, navId);
  return (
    <IconButton
      {...{
        disabled,
        className: clsx(
          isActive
            ? [classNameActive, classNameActiveSpecial]
            : classNameInactive
        ),
      }}
      onClick={() => navFunc(navPath)}
    >
      <IconComponent />
    </IconButton>
  );
};

const PokeAppBar = ({ setThemeMode, themeMode, pokemonAvailable }) => {
  const [classes, theme] = useThemedClasses(styles);
  const history = useHistory();
  const { pathname } = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleThemeSwitch = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const list = () => (
    <div
      className={classes.drawerList}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item>
            <Grid item container className={classes.logoTitle}>
              <IconButton
                edge="start"
                className={classes.logoButton}
                onClick={toggleDrawer(true)}
                color="inherit"
                aria-label="menu"
                size="small"
              >
                <SvgIcon
                  component={PokedexSVG}
                  colors={{
                    main: Color(theme.palette.secondary.main).mix(
                      Color(theme.palette.background.default),
                      0.15
                    ),
                    detail: Color("rgba(0,0,0,0)"),
                    detail2: Color(theme.palette.secondary.light)
                      .desaturate(0.15)
                      .mix(Color(theme.palette.text.primary), 0.75),
                    detail3: Color(theme.palette.info.main)
                      .mix(Color(theme.palette.background.primary), 0.15)
                      .saturate(1),
                    detail4: Color(theme.palette.secondary.dark)
                      .desaturate(0.25)
                      .mix(Color(theme.palette.background.default), 0.85)
                      .toString(),
                    //detail2: theme.palette.background.senary
                  }}
                  fontSize="large"
                  //style={{ fill: "#c30d22" }}
                  viewBox="0 0 640 650"
                />
              </IconButton>
              <Drawer
                anchor={"left"}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {list()}
              </Drawer>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.title}
                noWrap
              >
                Pokémon Dex
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <div
              style={{
                backgroundColor: theme.palette.background.quaternary,
                borderRadius: theme.spacing(3),
              }}
            >
              {PokemonDexURLs.map((url, i) => (
                <NavIconButton
                  key={i}
                  navId={i}
                  disabled={i === 1 && !(pokemonAvailable > 0)}
                  classNameActive={classes.navIconActive}
                  classNameInactive={classes.navIconInactive}
                  classNameActiveSpecial={
                    ["Search", "View", "Favourites"].map(
                      (name) => classes[`navIcon${name}Active`]
                    )[i]
                  }
                  navPath={`/${url}/${
                    i === 1 ? `?id=${pokemonAvailable}` : ""
                  }`}
                  currentPath={pathname}
                  navFunc={history.push}
                  iconComponent={
                    [SearchIcon, PokeballIcon, GradeTwoToneIcon][i]
                  }
                />
              ))}
            </div>
          </Grid>
          <Grid item className={classes.switchContainer}>
            <FormControlLabel
              className={classes.switchForm}
              value={themeMode}
              control={
                <Switch
                  checked={themeMode === "light"}
                  onChange={handleThemeSwitch}
                  classes={{
                    ...pick(classes, ["switchBase", "checked", "track"]),
                  }}
                />
              }
              label={<DarkLightIcon {...{ theme, themeMode }} />}
              labelPlacement="start"
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  themeMode: state.theme.mode,
  pokemonAvailable: state.pokemon.haveData,
});

const mapDispatchToProps = {
  setThemeMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokeAppBar);
