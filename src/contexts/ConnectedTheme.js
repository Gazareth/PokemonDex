import React from "react";
import { connect } from "react-redux";

import { theme } from "theme";
import { ThemeProvider } from "@material-ui/core/styles";

const mapStateToProps = state => ({
  themeMode: state.theme.mode
});

const ConnectedTheme = ({ themeMode, children, ...props }) => (
  <ThemeProvider children={children} theme={theme(themeMode)}></ThemeProvider>
);

export default connect(mapStateToProps)(ConnectedTheme);
