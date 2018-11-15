import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Organisms/Layout";
import Paper from "../components/Atoms/Paper";

import { css } from "react-emotion";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  ListSubheader,
  Typography
} from "@material-ui/core";
import SocialAccounts from "../components/Molecules/SocialAccounts";
import Products from "../components/Molecules/Products";

// とりあえず、ここにガリガリ書いてから、コンポーネント分ける方針で
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
      <Paper>
        <Grid container spacing={24} alignItems="center" direction="column">
          <Grid item xs={12}>
            <Avatar
              alt="Sasaki Peter"
              src="/img/icon.jpg"
              className={classes.avatar}
            />
            <Typography variant="h6" component="h2" className={classes.text}>
              name
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography
              // variant="body1"
              component="p"
              className={classes.text}
            >
              Be the one.
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            {/* 興味ある分野を書くところ */}
            <Grid container spacing={24}>
              <Grid item xs>
                <Button variant="contained" color="primary">
                  icon
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <SocialAccounts />
          </Grid>
          <Divider />
          <Grid item xs={12}>
            {/* <Typography variant="h6" component="h3">
            Products
          </Typography> */}
            <Products />
          </Grid>
        </Grid>
      </Paper>
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
