import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Navbar from "../Molecules/Navbar";
import Footer from "../Molecules/Footer";
import theme from "../../utils/theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import "../all.sass";

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

const TemplateWrapper = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Helmet title="Home | Pharmaceutical Programmer Portfolio" />
        <Navbar />
        <Paper className={classes.root} elevation={1}>
          {props.children}
        </Paper>
        {/* <Footer /> */}
      </MuiThemeProvider>
    </React.Fragment>
  );
};

TemplateWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemplateWrapper);
