import { makeStyles, useTheme } from "@material-ui/styles";

const useThemedClasses = styles => {
  const theme = useTheme();
  const classes = makeStyles(styles(theme));
  return [classes(), theme];
};

export default useThemedClasses;
