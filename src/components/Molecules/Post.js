import React from "react";
import { Link } from "gatsby";
import { Paper, ScrollParallax } from "../Atoms";
import { Typography } from "@material-ui/core";

export default ({ to, title, excerpt }) => (
  <ScrollParallax>
    <article>
      <Link to={to}>
        <Paper>
          <Typography component="h3" variant="h5">
            {title}
          </Typography>
          {/* <span>{post.frontmatter.date}</span> */}
          <Typography component="p">{excerpt}</Typography>
          {/* <img src={post.frontmatter.image} alt="hoge" /> */}
        </Paper>
      </Link>
    </article>
  </ScrollParallax>
);
