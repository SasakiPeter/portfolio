import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Paper } from "../components/Atoms";
import { Layout, Markdown } from "../components/Organisms";
import { Grid, Typography } from "@material-ui/core";
import { css } from "react-emotion";

export const AboutPageTemplate = ({ title, date, content }) => (
  <section
    className={css`
      padding: 16px 0;
    `}
  >
    <Paper>
      <Typography component="h1" variant="h1">
        {title}
      </Typography>
      <Typography component="p">更新日: {date}</Typography>
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
        date={post.frontmatter.date}
        content={post.html}
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
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
