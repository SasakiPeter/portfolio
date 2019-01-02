import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Paper } from "../components/Atoms";
import Layout from "../components/Organisms/Layout";

import { css } from "react-emotion";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Avatar, Button, Divider, Grid, Typography } from "@material-ui/core";
import SocialAccounts from "../components/Molecules/SocialAccounts";
import Products from "../components/Molecules/Products";

const styles = {
  avatar: {
    margin: "auto",
    width: 100,
    height: 100
  },
  text: {
    textAlign: "center"
  }
};

const IndexPage = props => {
  const { classes, data } = props;
  return (
    <Layout>
      <div
        className={css`
          padding: 24px 0;
        `}
      >
        <Paper>
          <Grid container spacing={24} alignItems="center" direction="column">
            <Grid item xs={12}>
              <Avatar
                alt="Sasaki Peter"
                src="/img/icon.jpg"
                className={classes.avatar}
              />
              <Typography component="h2" variant="h5" className={classes.text}>
                Sasaki Peter
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Typography
                component="p"
                variant="body1"
                className={classes.text}
              >
                Be the one.
              </Typography>
            </Grid>
            <Divider />
            {/* <Grid item xs={12}>
            興味ある分野を書くところ
            <Grid container spacing={24}>
              <Grid item xs>
                <Button variant="contained" color="primary">
                  icon
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Divider /> */}
            <Grid item xs={12}>
              <SocialAccounts />
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Products />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IndexPage);

// IndexPage.propTypes = {
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       edges: PropTypes.array
//     })
//   })
// };

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
