import React from "react";
import { connect } from "react-redux";

import Color from "color";

import { setThemeMode } from "store/actions";

import useThemedClasses from "contexts/ThemedClasses";

import { filterObject as filterObj } from "util/filterObject";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";

import PokedexSVG from "icons/PokedexIconV2";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness4Icon from "@material-ui/icons/Brightness4";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: "relative"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  alignRight: {
    marginLeft: "auto"
  },
  switchBase: {
    color: theme.palette.primary.dark,
    "&$checked": {
      color: theme.palette.warning.light
    },
    "&$checked + $track": {
      backgroundColor: theme.palette.warning.light
    }
  },
  checked: {},
  track: {}
});

const DarkLightIcon = ({ theme, themeMode }) => {
  const mode = themeMode === "light" ? 1 : 0;
  const findColor = colors => [colors.primary.dark, colors.warning.light][mode];
  const styles = {
    style: { color: findColor(theme.palette) }
  };
  const Component = [Brightness4Icon, Brightness5Icon][mode];
  return <Component {...styles} />;
};

const PokeAppBar = ({ setThemeMode, themeMode }) => {
  const [classes, theme] = useThemedClasses(styles);

  const handleThemeSwitch = () => {
    console.log("Setting theme mode!", setThemeMode.toString(), themeMode);
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <SvgIcon
            component={PokedexSVG}
            colors={{
              main: "#c30d22",
              detail: Color("#c30d22")
                .mix(Color(theme.palette.text.primary), 0.35)
                .mix(Color(theme.palette.background.default), 0)
                .fade(1),
              detail2: Color("#c30d22")
                .mix(Color(theme.palette.text.primary), 0.55)
                .mix(Color(theme.palette.background.default), 0)
                //.fade(1)
                .toString()

              //detail2: theme.palette.background.senary
            }}
            fontSize="large"
            //style={{ fill: "#c30d22" }}
            viewBox="0 0 640 650"
          />
        </IconButton>
        <Typography
          variant="h6"
          color="textSecondary"
          className={classes.title}
          noWrap
        >
          Pokémon Dex
        </Typography>
        <FormControlLabel
          value={themeMode}
          control={
            <Switch
              checked={themeMode === "light"}
              onChange={handleThemeSwitch}
              classes={{
                ...filterObj(classes, ["switchBase", "checked", "track"])
              }}
            />
          }
          label={<DarkLightIcon {...{ theme, themeMode }} />}
          labelPlacement="start"
        />
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  themeMode: state.theme.mode
});

const mapDispatchToProps = {
  setThemeMode
};

export default connect(mapStateToProps, mapDispatchToProps)(PokeAppBar);
