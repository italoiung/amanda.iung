const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')

// Querying everything that will use specific templates and assigning it
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
            categories {
              slug
            }
            tags {
              slug
            }
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
            name
            slug
          }
        }
      }
      allWordpressTag(filter: { count: { gt: 0 } }) {
        edges {
          node {
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

  // Create page for each published posts and inserting them into an array
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

  // Create paginated archive page
  paginate({
    createPage,
    items: publishedPosts,
    itemsPerPage: 4,
    pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? `/blog` : `/blog/page`),
    component: path.resolve(`./src/templates/blog.js`)
  })

  allWordpressCategory.edges.forEach(edge => {
    // Filter array of published posts with given category slug
    let objectFilter = { slug: edge.node.slug }
    let filteredPosts = publishedPosts.filter(post => post.node.categories.includes(objectFilter))
    console.log(filteredPosts)

    // Create paginated page for each category
    paginate({
      createPage,
      items: filteredPosts,
      itemsPerPage: 3,
      pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? `/blog/categoria/${edge.node.slug}` : `/blog/categoria/${edge.node.slug}/page`),
      component: path.resolve(`./src/templates/category.js`),
      context: {
        name: edge.node.name,
        slug: edge.node.slug
      }
    })
  })

  allWordpressTag.edges.forEach(edge => {
    // Filter array of published posts with given tag slug
    let objectFilter = { slug: edge.node.slug }
    let filteredPosts = publishedPosts.filter(post => post.node.tags.includes(objectFilter))
    console.log(filteredPosts)

    // Create paginated page for each tag
    paginate({
      createPage,
      items: filteredPosts,
      itemsPerPage: 3,
      pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? `/blog/tag/${edge.node.slug}` : `/blog/tag/${edge.node.slug}/page`),
      component: path.resolve(`./src/templates/tag.js`),
      context: {
        name: edge.node.name,
        slug: edge.node.slug
      }
    })
  })

  // Creating pages for wordpress pages which are already known to exist
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