import React from "react";
import { Link, StaticQuery } from "gatsby";
// import github from "../img/github-icon.svg";
import logo from "../../img/icon.jpg";
import { css } from "react-emotion";
import { rhythm } from "../../utils/typography";

import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Icon,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import CodeIcon from "@material-ui/icons/Code";
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';
// import Divider from "@material-ui/core/Divider";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query {
            allRootYaml {
              edges {
                node {
                  id
                  name
                  to
                  fa
                }
              }
            }
          }
        `}
        render={data => (
          <nav className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  aria-owns={anchorEl ? "menu-items" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  id="menu-items"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  {data.allRootYaml.edges.map(({ node }, index) => (
                    <MenuItem onClick={this.handleClose} key={node.id}>
                      <Link
                        to={node.to}
                        className={css`
                          display: flex;
                          align-items: center;
                        `}
                      >
                        <Icon
                          className={classNames(css(`width:1.2em;`), node.fa)}
                        />
                        <ListItemText primary={node.name} inset />
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
                <Typography
                  variant="h6"
                  component="h1"
                  color="inherit"
                  className={classes.grow}
                >
                  <Link
                    to="/"
                    // 今はall.sassに記述しているが、もしかしたらmodule CSSにするかもしれない
                    // className={css`
                    //   text-decoration: none;
                    //   color: inherit;
                    // `}
                  >
                    Portfolio
                  </Link>
                </Typography>
              </Toolbar>
            </AppBar>
          </nav>
        )}
      />
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
