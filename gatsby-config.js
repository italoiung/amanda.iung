module.exports = {
  siteMetadata: {
    title: `Amanda Iung`,
    description: `Jornalista Freelancer`,
    url: `https://amanda.iung.me`,
    owner: `@amanda_iung`,
    author: `Ítalo Iung`,
    authorUrl: `https://italo.iung.me`,
  },
  plugins: [
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
        name: `Amanda Iung`,
        short_name: `Amanda Iung`,
        start_url: `/`,
        background_color: `#758387`,
        theme_color: `#758387`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `localhost:8012/amanda.iung.admin`,
        protocol: `http`,
        hostingWPCOM: false,
        useACF: true,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/media",
          "**/tags",
          "**/taxonomies",
          "**/services",
          "**/pages",
          "**/menus",
          "**/trabalhos"
        ],
        // plugins: [
        //   {
        //     resolve: `gatsby-wordpress-inline-images`,
        //     options: {
        //       baseUrl: `localhost:8012/amanda.iung.admin`,
        //       protocol: `http`,
        //       maxWidth: 1152,
        //       useACF: true
        //     }
        //   }
        // ]
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto Condensed`
          },
          {
            family: `Comfortaa`
          },
          {
            family: `Montserrat`
          },
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
