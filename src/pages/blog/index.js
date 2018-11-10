import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Organisms/Layout";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    console.log(data);

    return (
      <Layout>
        <section>
          <div>
            <h1>Latest Stories</h1>
          </div>
          {posts.map(({ node: post }) => (
            <div
              style={{ border: "1px solid #eaecee", padding: "2em 4em" }}
              key={post.id}
            >
              <p>
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                <span> &bull; </span>
                <small>{post.frontmatter.date}</small>
              </p>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link to={post.fields.slug}>Keep Reading →</Link>
              </p>
            </div>
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
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
`;
