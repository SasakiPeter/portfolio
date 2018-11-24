import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Paper } from "../components/Atoms";
import { Layout, Markdown } from "../components/Organisms";
import { Typography } from "@material-ui/core";

export const AboutPageTemplate = ({ title, content }) => (
  <section>
    <Paper>
      <Typography component="h2" variant="h4">
        {title}
      </Typography>
      <Markdown content={content} />
    </Paper>
  </section>
);

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired
  // content: PropTypes.string,
  // contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <AboutPageTemplate
        title={post.frontmatter.title}
        content={post.htmlAst}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`;
