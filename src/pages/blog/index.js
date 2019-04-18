import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Paper } from "../../components/Atoms";
import { Post } from "../../components/Molecules";
import Layout from "../../components/Organisms/Layout";
import { Typography } from "@material-ui/core";

import { css } from "react-emotion";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return (
      <Layout>
        <section
          className={css`
            padding: 16px 0;
          `}
        >
          <header>
            <Paper>
              <Typography component="h2" variant="h2">
                Latest Posts
              </Typography>
            </Paper>
          </header>
          {/* ここをScrollOverPackにする */}
          {posts.map(({ node: post }, index) => (
            <Post
              key={post.fields.slug}
              to={post.fields.slug}
              title={post.frontmatter.title}
              excerpt={post.excerpt}
              date={post.frontmatter.date}
              image={post.frontmatter.image}
            />
          ))}
        </section>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "YYYY-MM-DD")
            image
          }
        }
      }
    }
  }
`;
