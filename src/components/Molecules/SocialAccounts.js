import React from "react";
// import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { css } from "react-emotion";

// なんと、これがないと全てのアイコンが消滅してしまうということを発見した
import "@fortawesome/fontawesome-free/css/all.css";
import { Button, Grid, Icon } from "@material-ui/core";

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allSocialAccountsYaml {
            edges {
              node {
                id
                name
                label
                href
                fa
              }
            }
          }
        }
      `}
      render={data => (
        <Grid container spacing={24}>
          {data.allSocialAccountsYaml.edges.map(({ node }, index) => (
            <Grid item xs key={node.id}>
              <Button variant="contained" href={node.href} color="primary">
                <Icon className={node.fa} />
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    />
  );
};

// SocialAccounts.propTypes = {
//   data: PropTypes.shape({
//     allSocialAccountsYaml: PropTypes.object
//   })
// };

// export default SocialAccounts;
