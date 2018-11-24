module.exports = {
  siteMetadata: {
    title: "Pharmaceutical Programmer Peter"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/config`,
        name: "config"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-emotion",
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`
    //   }
    // },
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: []
      }
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: "Phamaceutical Programmer",
    //     short_name: "Phamaceutical Programmer",
    //     start_url: "/",
    //     background_color: "#fafafa",
    //     theme_color: "#adf3ff",
    //     display: "minimal-ui",
    //     icon: `src/img/icon.jpg`
    //   }
    // },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
