import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Paper } from "../components/Atoms";
import { Products } from "../components/Molecules";
import { Layout, Markdown } from "../components/Organisms";
import { Typography } from "@material-ui/core";
import { css } from "react-emotion";

export default ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <section
        className={css`
          padding: 16px 0;
        `}
      >
        <Paper>
          <Typography component="h1" variant="h1">
            {post.frontmatter.title}
          </Typography>
          <Markdown content={post.html} />
          <Products
            className={css`
              margin: 0.3em;
            `}
          />
        </Paper>
      </section>
    </Layout>
  );
};

// ProductPage.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.shape({
//       frontmatter: PropTypes.object
//     })
//   })
// };

// export default ProductPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;
