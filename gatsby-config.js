module.exports = {
  pathPrefix: "/story-creator",
  siteMetadata: {
    title: `Story Creator App`,
    description: `The application generates user stories MD markup based on your minimum data.`,
    author: `Maxim Kudryavtsev`,
    siteUrl: `https://maximkudriavtsev.github.io/`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The application for simple creating user stories.`,
        short_name: `Creating User Stories app`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-32x32.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-140052799-2',
      },
    },
  ],
}
