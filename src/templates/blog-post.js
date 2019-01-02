import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, navigate } from "gatsby";
import { Paper } from "../components/Atoms";
import { Layout, Markdown } from "../components/Organisms";
import { Chip, Typography } from "@material-ui/core";
import { css } from "react-emotion";

export const BlogPostTemplate = ({
  content,
  description,
  tags,
  image,
  title,
  helmet
}) => {
  console.log(content);
  return (
    <article
      className={css`
        padding: 16px 0;
      `}
    >
      <Paper>
        {helmet || ""}
        <Typography component="h1" variant="h3">
          {title}
        </Typography>
        <Typography component="p">{description}</Typography>
        <img src={image} alt="" />
        {tags && tags.length ? (
          // marginの大きさが気にくわないので、要リファクタリング
          <ul
            className={css`
              list-style: none;
              padding: 0;
              display: flex;
              flex-wrap: wrap;
            `}
          >
            {tags.map(tag => (
              <li
                key={tag + `tag`}
                className={css`
                  margin-right: 5px;
                `}
              >
                <Chip
                  label={tag}
                  component="a"
                  clickable
                  onClick={() => navigate(`/tags/${kebabCase(tag)}/`)}
                />
              </li>
            ))}
          </ul>
        ) : null}
        <Markdown content={content} />
      </Paper>
    </article>
  );
};

BlogPostTemplate.propTypes = {
  // content: PropTypes.node.isRequired,
  // contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  // helmet: PropTypes.instanceOf(Helmet)
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        // content={post.html}
        content={post.htmlAst}
        // contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet
            title={`${post.frontmatter.title} | Blog`}
            meta={[
              { name: "description", content: post.frontmatter.description },
              { property: "og:title", content: post.frontmatter.title },
              {
                property: "og:description",
                content: post.frontmatter.description
              },
              {
                property: "og:image",
                content: post.frontmatter.image
              }
            ]}
          />
        }
        tags={post.frontmatter.tags}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};
export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image
      }
    }
  }
`;
