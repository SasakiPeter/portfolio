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
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h3">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="p" variant="h5">
            {date}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Markdown content={content} />
        </Grid>
      </Grid>
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
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
