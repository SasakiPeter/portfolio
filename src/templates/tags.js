import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Organisms/Layout";
import { Paper } from "../components/Atoms";
import { Post } from "../components/Molecules";
import { Typography } from "@material-ui/core";
import { css } from "react-emotion";

class TagRoute extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { edges: posts, totalCount } = data.allMarkdownRemark;
    const postLinks = posts.map(({ node: post }) => (
      <Post
        key={post.fields.slug}
        to={post.fields.slug}
        title={post.frontmatter.title}
        excerpt={post.excerpt}
      />
    ));
    const tag = pageContext.tag;
    const title = data.site.siteMetadata.title;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag}”`;

    return (
      <Layout>
        <section
          className={css`
            padding: 16px 0;
          `}
        >
          <Paper>
            <Helmet title={`${tag} | ${title}`} />
            <Typography component="h1" variant="h1">
              {tagHeader}
            </Typography>
          </Paper>
          {postLinks}
          <Paper>
            <Link to="/tags/">Browse all tags</Link>
          </Paper>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          excerpt
        }
      }
    }
  }
`;
