import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

const Progress = ({ classes }) => (
  <CircularProgress
    className={classes.progress}
    style={{ color: purple[500] }}
    thickness={7}
  />
);

Progress.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Progress);
