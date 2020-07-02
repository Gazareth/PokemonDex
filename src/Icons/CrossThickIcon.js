import * as React from "react";

import SvgIcon from "@material-ui/core/SvgIcon";

const CROSSTHICK_SVG = (
  <path d="M386.813 0L245 141.812 103.188 0 0 103.188 141.813 245 0 386.812l103.187 103.187L245 348.187 386.813 490 490 386.812 348.187 244.999 490 103.187z" />
);

const CrossThickIcon = (props) => {
  //const mainTheme = useTheme();
  //const classes = useStyles(mainTheme);
  return (
    <SvgIcon {...props} viewBox="0 0 512 512">
      {CROSSTHICK_SVG}
    </SvgIcon>
  );
};

export default CrossThickIcon;
