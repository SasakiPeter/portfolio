import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// themeに記述するものあり
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "600px"
  }
});

const ContentWrapper = props => {
  const { children, classes } = props;
  return (
    <Paper className={classes.root} elevation={1}>
      {children}
    </Paper>
  );
};

export default withStyles(styles)(ContentWrapper);
