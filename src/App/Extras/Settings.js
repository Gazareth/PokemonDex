import React, { useState, useMemo, useCallback, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";

//import { Base64 } from "js-base64";
import LZString from "lz-string";

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

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import ReportProblemTwoToneIcon from "@material-ui/icons/ReportProblemTwoTone";
import RestoreSharpIcon from "@material-ui/icons/RestoreSharp";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";

import {
  importData,
  setThemeMode,
  setApiInterval,
  clearData,
} from "Store/actions";

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
    exportTitle: {
      color: theme.palette.info.main,
    },
    copySuccess: {
      color: theme.palette.success.main,
    },
    importTitle: {
      color: theme.palette.secondary.main,
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

const ImpSnackbar = ({ open, duration, onClose, severity, message }) => (
  <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
    <Alert elevation={6} variant="filled" onClose={onClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

const SettingsDialog = ({
  open,
  handleClose,
  themeMode: stateThemeMode,
  apiInterval: stateApiInterval,
  setThemeMode: stateSetThemeMode,
  setApiInterval: stateSetApiInterval,
  pokemonData,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const initialInterval =
    stateApiInterval || parseInt(process.env.REACT_APP_APIINTERVAL);
  const dispatch = useDispatch();

  const importStringRef = useRef(null);
  const [noImportText, setNoImportText] = useState(true);

  const [themeMode, setThemeMode] = useState(stateThemeMode);
  const [apiInterval, setApiInterval] = useState(initialInterval);
  const [clearingCache, setClearingCache] = useState(false);
  const [impExpMode, setImpExpMode] = useState(false);

  const [clipCopyShow, setClipCopyShow] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackError, setSnackError] = useState(false);

  //IMPORT/EXPORT
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleSnackErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackError(false);
  };

  const encodedPokemon = useMemo(
    () => LZString.compressToUTF16(JSON.stringify(pokemonData)),
    [pokemonData]
  );

  const handleExpCopied = () => {
    document.getElementById("exportStringField").select();
    document.execCommand("copy");
    setTimeout(() => setClipCopyShow(false), 6000);
    setClipCopyShow(true);
  };

  const handleImportData = () => {
    const stringVal = get(importStringRef, "current.value");
    const resetError = () => setInterval(() => setSnackError(false), 6000);
    try {
      const decoded = LZString.decompressFromUTF16(stringVal);
      const storeData = JSON.parse(decoded);
      const pokemonData = get(storeData, "pokemon");
      const favouritesData = get(storeData, "favourites");
      if (
        pokemonData &&
        !isEmpty(pokemonData) &&
        favouritesData &&
        !isEmpty(favouritesData)
      ) {
        dispatch(importData(storeData));
        setSnackError(false);
        setSnackOpen(true);
        importStringRef.current.value = "";
      } else {
        setSnackError(true);
        resetError();
        console.log(
          "Error importing! - decode successful, but no data inside!"
        );
      }
    } catch (err) {
      console.log("Error importing! - ", err);
      setSnackError(true);
      resetError();
    }
  };

  // MAIN SETTINGS
  const lightMode = useMemo(() => themeMode === "light", [themeMode]);

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
    dispatch(clearData());
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
            <ImpSnackbar
              open={snackOpen && !snackError}
              duration={3500}
              onClose={handleSnackClose}
              severity="success"
              message="Data imported successfully!"
            />
            <ImpSnackbar
              open={snackError}
              duration={6000}
              onClose={handleSnackErrorClose}
              severity="error"
              message="Data import string not valid!"
            />
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
                  component="div"
                  variant="h6"
                  gutterBottom
                  align="left"
                  className={classes.exportTitle}
                >
                  Export{" "}
                  <IconButton onClick={handleExpCopied}>
                    {clipCopyShow ? <FileCopyIcon /> : <FileCopyOutlinedIcon />}
                  </IconButton>
                  {clipCopyShow && (
                    <span className={classes.copySuccess}>
                      <CheckCircleOutlineIcon
                        style={{ verticalAlign: "-6px" }}
                        fontSize="small"
                      />
                      <Typography component="span" variant="caption">
                        {" "}
                        Copied to clipboard!
                      </Typography>
                    </span>
                  )}
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
                    id: "exportStringField",
                    readOnly: true,
                    onClick: (e) => e.target.select(),
                    style: {
                      color: theme.palette.text.disabled,
                      fontSize: "0.75rem",
                      lineHeight: "0.85rem",
                      letterSpacing: "0.01px",
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  className={classes.importTitle}
                  gutterBottom
                >
                  Import
                </Typography>
                <TextField
                  multiline={true}
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  rowsMax={6}
                  rows={6}
                  aria-label="import string input"
                  placeholder="Enter import string..."
                  onChange={({ target: { value } }) =>
                    setNoImportText(isEmpty(value.trim()))
                  }
                  inputRef={importStringRef}
                />
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: "1rem" }}
                    disabled={noImportText}
                    onClick={handleImportData}
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
