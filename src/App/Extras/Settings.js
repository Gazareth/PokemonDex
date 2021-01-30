import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { setThemeMode, setApiInterval } from "Store/actions";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import RestoreSharpIcon from "@material-ui/icons/RestoreSharp";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(6),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(6),
  },
  sliderRoot: {
    width: 300,
  },

  divider: {
    margin: "54px 0 40px",
  },
  button: {
    margin: "0 0 24px",
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const marks = [
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

const APISlider = () => {
  const classes = useStyles();

  return (
    <div className={classes.sliderRoot}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Search time (ms)
      </Typography>
      <Slider
        defaultValue={200}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="off"
        marks={marks}
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
}) => {
  const classes = useStyles();
  const [themeMode, setThemeMode] = useState(stateThemeMode);
  const [apiInterval, setApiInterval] = useState(stateApiInterval);

  const handleThemeSwitch = (val) => {
    console.log("val?", val);
    const modeVal = val.target.checked ? "light" : "dark";
    setThemeMode(modeVal);
    stateSetThemeMode(modeVal);
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
        <DialogContentText>
          Tweak the search timing, change between dark or light colour schemes,
          or clear your cached Pokémon data.
        </DialogContentText>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <APISlider />
          </FormControl>
          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Switch
                checked={themeMode === "light"}
                onChange={handleThemeSwitch}
              />
            }
            label="Light Mode"
          />
          <Divider className={classes.divider} />
          <FormControl>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<RestoreSharpIcon />}
              id="clear-data"
            >
              Remove all cached Pokémon
            </Button>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  themeMode: state.theme.mode,
  apiInterval: state.theme.apiInterval,
});

const mapDispatchToProps = {
  setThemeMode,
  setApiInterval,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
