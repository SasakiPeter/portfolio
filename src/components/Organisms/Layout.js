import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import theme from "../../utils/theme";
import { Footer, Navbar } from "../Molecules";
import { MuiThemeProvider, CssBaseline, Typography } from "@material-ui/core";
import "../all.sass";

const TemplateWrapper = ({ children }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Helmet title="Home | Pharmaceutical Programmer Peter" />
      <Typography component="p" variant="h5" color="error">
        My website is still under construction, so come back later.
      </Typography>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </MuiThemeProvider>
  </React.Fragment>
);

// TemplateWrapper.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default TemplateWrapper;
