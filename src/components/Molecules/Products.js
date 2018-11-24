import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { css } from "react-emotion";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography
} from "@material-ui/core";

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allProductsYaml {
          edges {
            node {
              id
              name
              description
              github
              href
              image
              language
            }
          }
        }
      }
    `}
    render={data => (
      <Grid container spacing={24}>
        {data.allProductsYaml.edges.map(({ node }, index) => (
          <Grid item xs key={node.id}>
            <Card>
              <CardActionArea href={node.href}>
                <CardMedia
                  // component="img"
                  className={css`
                    height: 140px;
                  `}
                  image={node.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h4">
                    {node.name}
                  </Typography>
                  <Typography component="p">{node.description}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Chip label={node.language} />
                <Button size="small" color="primary" href={node.github}>
                  GitHub
                </Button>

                {/* <Button size="small" color="secondary">
                  Learn More
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
  />
);
