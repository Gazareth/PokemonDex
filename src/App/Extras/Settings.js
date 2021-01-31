import React, { useState, useMemo, useCallback } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { Base64 } from "js-base64";

import SwipeableViews from "react-swipeable-views";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import ReportProblemTwoToneIcon from "@material-ui/icons/ReportProblemTwoTone";
import RestoreSharpIcon from "@material-ui/icons/RestoreSharp";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";

import get from "lodash/get";
import pick from "lodash/pick";

import { setThemeMode, setApiInterval } from "Store/actions";

const useStyles = makeStyles((theme) => {
  const lightMode = theme.palette.type === "light";
  return {
    impExpWrap: {
      margin: "2vh 2vw",
      [theme.breakpoints.down("lg")]: {
        margin: "2vh 6vw",
      },
      [theme.breakpoints.down("md")]: {
        margin: "2vh 12vw",
      },
    },
    impExpGrid: {
      height: "100%",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "fit-content",
    },
    formControl: {
      marginTop: theme.spacing(7),
      minWidth: 120,
    },
    themeModeIcon: {
      verticalAlign: "-6px",
      color: get(
        theme,
        `palette.${lightMode ? "warning.light" : "primary.dark"}`
      ),
      ...(lightMode
        ? {}
        : {
            backgroundColor: theme.palette.background.octonary,
            borderRadius: "1em",
            border: `1px solid ${theme.palette.background.octonary}`,
          }),
    },
    sliderRoot: {
      width: 300,
    },

    divider: {
      margin: "72px 0 32px",
    },
    divider2: {
      margin: "32px 0",
    },
    buttonImpExp: {
      marginBottom: theme.spacing(2),
    },
    buttonClearCache: {
      // margin: "0 0 24px",
      backgroundColor: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
      },
    },
    clearCacheGrid: {
      height: "100%",
      textAlign: "center",
    },
    warningIcon: {
      fontSize: "4rem",
      color: "red",
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
  };
});

const swipeableStyle = {
  height: "100%",
  overflow: "hidden auto",
};

const sliderMarks = [
  {
    value: 200,
    label: "200",
  },
  {
    value: 375,
    label: "375",
  },
  {
    value: 500,
    label: "500",
  },
  {
    value: 1000,
    label: "1000",
  },
];

function valuetext(value) {
  return `${value}ms`;
}

const APISlider = ({ interVal, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.sliderRoot}>
      <Typography gutterBottom>Search time interval (ms)</Typography>
      <Typography variant="caption" color="textSecondary">
        Time interval between API calls in milliseconds.
      </Typography>
      <Slider
        value={interVal}
        onChange={onChange}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="off"
        marks={sliderMarks}
        min={0}
        max={1000}
      />
    </div>
  );
};

const SettingsDialog = ({
  open,
  handleClose,
  themeMode: stateThemeMode,
  apiInterval: stateApiInterval,
  setThemeMode: stateSetThemeMode,
  setApiInterval: stateSetApiInterval,
  pokemonData,
  clearData,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const initialInterval =
    stateApiInterval || parseInt(process.env.REACT_APP_APIINTERVAL);

  const [themeMode, setThemeMode] = useState(stateThemeMode);
  const [apiInterval, setApiInterval] = useState(initialInterval);
  const [clearingCache, setClearingCache] = useState(false);
  const [impExpMode, setImpExpMode] = useState(true);

  const lightMode = useMemo(() => themeMode === "light", [themeMode]);
  const encodedPokemon = useMemo(
    () => Base64.encode(JSON.stringify(pokemonData)),
    [pokemonData]
  );

  const handleDialogClose = (...args) => {
    setClearingCache(false);
    handleClose(...args);
  };

  const handleIntervalSwitch = useCallback(
    (event, newValue) => {
      if (newValue !== apiInterval) {
        setApiInterval(newValue);
        stateSetApiInterval(newValue);
      }
    },
    [apiInterval, stateSetApiInterval]
  );

  const handleThemeSwitch = (val) => {
    const modeVal = val.target.checked ? "light" : "dark";
    setThemeMode(modeVal);
    stateSetThemeMode(modeVal);
  };

  const handleClearData = () => {
    clearData();
    setClearingCache(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Settings</DialogTitle>
      <DialogContent>
        <SwipeableViews
          style={{ ...swipeableStyle }}
          containerStyle={{ height: "100%" }}
          slideStyle={{ ...swipeableStyle }}
          index={impExpMode ? 0 : clearingCache ? 2 : 1}
          disabled
        >
          <div className={classes.impExpWrap}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={5}
              className={classes.impExpGrid}
              style={{ overflow: "hidden" }}
            >
              <Grid item>
                <Typography
                  variant="h6"
                  color="secondary"
                  gutterBottom
                  align="left"
                >
                  Export{" "}
                  <IconButton>
                    <FileCopyOutlinedIcon />
                  </IconButton>
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  variant="outlined"
                  rowsMax={6}
                  rows={6}
                  aria-label="Export string field"
                  defaultValue={encodedPokemon}
                  inputProps={{
                    readOnly: true,
                    onClick: (e) => e.target.select(),
                    style: {
                      color: theme.palette.text.disabled,
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" color="primary" gutterBottom>
                  Import
                </Typography>
                <TextField
                  multiline={true}
                  fullWidth
                  variant="outlined"
                  rowsMax={6}
                  rows={6}
                  aria-label="import string input"
                  placeholder="Enter import string..."
                />
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "1rem" }}
                    onClick={handleClearData}
                  >
                    Import data
                  </Button>
                </div>
              </Grid>
              <Grid item style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => setImpExpMode(false)}
                  endIcon={<ArrowRightAltIcon />}
                >
                  Back to settings
                </Button>
              </Grid>
            </Grid>
          </div>
          <div>
            <DialogContentText>
              Tweak the search timing, change between dark or light colour
              schemes, or clear your cached Pokémon data.
            </DialogContentText>
            <form className={classes.form} noValidate>
              <FormControl className={classes.formControl}>
                <Typography gutterBottom>Theme</Typography>
                <Typography variant="caption" color="textSecondary">
                  Switch to dark mode for viewing in dark conditions.
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={lightMode}
                      onChange={handleThemeSwitch}
                      classes={{
                        ...pick(classes, ["switchBase", "checked", "track"]),
                      }}
                    />
                  }
                  label={
                    <Typography
                      component="div"
                      color="textSecondary"
                      style={{ display: "inline" }}
                    >
                      {" "}
                      {React.createElement(
                        lightMode ? Brightness5Icon : Brightness4Icon,
                        {
                          className: classes.themeModeIcon,
                        }
                      )}{" "}
                      {lightMode ? "Light" : "Dark"}&nbsp;Mode
                    </Typography>
                  }
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <APISlider
                  interVal={apiInterval}
                  onChange={handleIntervalSwitch}
                />
              </FormControl>
              <Divider className={classes.divider} />
              <FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.buttonImpExp}
                  startIcon={<AssignmentReturnedIcon />}
                  id="clear-data"
                  onClick={() => setImpExpMode(true)}
                >
                  Import/Export data
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.buttonClearCache}
                  startIcon={<RestoreSharpIcon />}
                  id="clear-data"
                  onClick={() => setClearingCache(true)}
                >
                  Remove all cached Pokémon
                </Button>
              </FormControl>
              <Divider className={classes.divider2} />
            </form>
          </div>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={5}
            className={classes.clearCacheGrid}
            style={{ overflow: "hidden" }}
          >
            <Grid item>
              <ReportProblemTwoToneIcon className={classes.warningIcon} />
            </Grid>
            <Typography variant="h4" color="error" gutterBottom>
              Warning
            </Typography>
            <Grid item>
              <Typography variant="h6">
                This will remove{" "}
                <i>
                  <u>all</u>
                </i>{" "}
                cached data.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Are you sure?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "1rem" }}
                onClick={handleClearData}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={() => setClearingCache(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </SwipeableViews>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  themeMode: state.theme.mode,
  apiInterval: state.theme.interval,
  pokemonData: pick(state, ["pokemon", "favourites"]),
});

const mapDispatchToProps = {
  setThemeMode,
  setApiInterval,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
