const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress posts (route : /blog/{slug})
// Will create pages for WordPress projects (route : /projects/{slug})
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const posts = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            id
            slug
            status
          }
        }
      }
      allWordpressPage {
        edges {
          node {
            id
            slug
            status
          }
        }
      }
      allWordpressWpServices {
        edges {
          node {
            id
            slug
            status
          }
        }
      }
      allWordpressCategory(filter: { count: { gt: 0 } }) {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      allWordpressTag(filter: { count: { gt: 0 } }) {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  `)

    // Check for any errors
    if (posts.errors) {
        throw new Error(posts.errors)
    }

    // Access query posts via object destructuring
    const { allWordpressPost } = posts.data
    const { allWordpressCategory } = posts.data
    const { allWordpressTag } = posts.data
    const { allWordpressPage } = posts.data
    const { allWordpressWpServices } = posts.data

    // We want to create a detailed page for each
    // post node. We'll just use the WordPress Slug for the slug.
    // The Post ID is prefixed with 'POST_'
    const publishedPosts = []
    allWordpressPost.edges.forEach(edge => {
        if (edge.node.status === 'publish') {
            publishedPosts.push(edge)
            createPage({
                path: `/blog/${edge.node.slug}/`,
                component: path.resolve(`./src/templates/post.js`),
                context: {
                    id: edge.node.id
                },
            })
        }
    })
    paginate({
        createPage,
        items: publishedPosts,
        itemsPerPage: 10,
        pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? `/blog` : `/blog/page`),
        component: path.resolve(`./src/templates/blog.js`)
    })
    allWordpressCategory.edges.forEach(edge => {
        createPage({
            path: `/blog/categoria/${edge.node.slug}/`,
            component: path.resolve(`./src/templates/category.js`),
            context: {
                name: edge.node.name,
                slug: edge.node.name
            }
        })
    })
    allWordpressTag.edges.forEach(edge => {
        createPage({
            path: `/blog/tag/${edge.node.slug}/`,
            component: path.resolve(`./src/templates/tag.js`),
            context: {
                name: edge.node.name,
                slug: edge.node.name
            }
        })
    })
    allWordpressPage.edges.forEach(edge => {
        const localPath = edge.node.slug === 'home' ? `/` : `/${edge.node.slug}`
        if (edge.node.status === 'publish')
            createPage({
                path: localPath,
                component: path.resolve(`./src/templates/page-${edge.node.slug}.js`),
                context: {
                    id: edge.node.id
                },
            })
    })
    allWordpressWpServices.edges.forEach(edge => {
        if (edge.node.status === 'publish')
            createPage({
                path: `/services/${edge.node.slug}/`,
                component: path.resolve(`./src/templates/service.js`),
                context: {
                    id: edge.node.id,
                },
            })
    })
}