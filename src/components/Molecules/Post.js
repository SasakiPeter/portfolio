import React from "react";
import { Link } from "gatsby";
import { Paper, ScrollParallax } from "../Atoms";
import { Typography } from "@material-ui/core";

export default ({ to, title, excerpt, date, image }) => (
  <ScrollParallax>
    <article>
      <Link to={to}>
        <Paper>
          <Typography component="h3" variant="h3">
            {title}
          </Typography>
          <Typography component="p">更新日: {date}</Typography>
          <Typography component="p">{excerpt}</Typography>
        </Paper>
      </Link>
    </article>
  </ScrollParallax>
);
