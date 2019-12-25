module.exports = {
  siteMetadata: {
    title: `Amanda Iung`,
    description: `Jornalista Freelancer`,
    siteUrl: `https://amanda.iung.me`,
    owner: `@amanda_iung`,
    author: `Ítalo Iung`,
    image: `https://amanda.iung.me/static/main-full-05abd679c07841e6638bb40aa8030dcc.jpg`,
    authorUrl: `https://italo.iung.me`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
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
        icon: `src/assets/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `adminamanda.iung.me`,
        protocol: `https`,
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
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressPost } }) => {
              return allWordpressPost.edges.map(edge => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.title,
                    description: edge.node.excerpt,
                    date: edge.node.date,
                    url: site.siteMetadata.siteUrl + "/blog/" + edge.node.slug,
                    guid: site.siteMetadata.siteUrl + "/blog/" + edge.node.slug,
                  }
                )
              })
            },
            query: `
              {
                allWordpressPost(sort: { fields: [date], order: DESC }) {
                  edges {
                    node {
                      title
                      excerpt
                      slug
                    }
                  }
                }
                site {
                  siteMetadata {
                    title
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Amanda Iung - RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://amanda.iung.me',
        sitemap: 'https://amanda.iung.me/sitemap.xml',
        policy: [{ userAgent: '*', disallow: ['/'] }]
      }
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-154569990-1`,
        // Puts tracking script in the head instead of the body
        head: false,
        // enable ip anonymization
        anonymize: true
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-netlify-cache'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
