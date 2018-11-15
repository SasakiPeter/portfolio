import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Navbar from "../Molecules/Navbar";
import Footer from "../Molecules/Footer";
import theme from "../../utils/theme";
import {
  MuiThemeProvider,
  CssBaseline,
  Paper,
  Typography
} from "@material-ui/core";
import "../all.sass";

const TemplateWrapper = ({ children }) => {
  // const { children } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Helmet title="Home | Pharmaceutical Programmer Portfolio" />
        <Navbar />
        {children}
        {/* <Footer /> */}
      </MuiThemeProvider>
    </React.Fragment>
  );
};

// TemplateWrapper.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default TemplateWrapper;
