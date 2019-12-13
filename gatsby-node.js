const path = require('path')
const fs = require('fs')
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
            acf {
              trabalhos
            }
          }
        }
      }
      allWordpressWpTrabalhos {
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
  const { allWordpressWpTrabalhos } = posts.data

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
    let filteredCatPosts = publishedPosts.filter(post => post.node.categories.includes(objectFilter))

    // Create paginated page for each category
    paginate({
      createPage,
      items: filteredCatPosts,
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
    let filteredTagPosts = publishedPosts.filter(post => post.node.tags.includes(objectFilter))

    // Create paginated page for each tag
    paginate({
      createPage,
      items: filteredTagPosts,
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
    const webPath = edge.node.slug === 'home' ? `/` : `/${edge.node.slug}`
    const filePath = fs.existsSync(`./src/templates/page-${edge.node.slug}.js`) ? `./src/templates/page-${edge.node.slug}.js` : `./src/templates/page.js`
    if (edge.node.status === 'publish')
      createPage({
        path: webPath,
        component: path.resolve(filePath),
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
          trabalhos: edge.node.acf.trabalhos
        },
      })
  })

  allWordpressWpTrabalhos.edges.forEach(edge => {
    if (edge.node.status === 'publish')
      createPage({
        path: `/trabalhos/${edge.node.slug}/`,
        component: path.resolve(`./src/templates/trabalho.js`),
        context: {
          id: edge.node.id,
        },
      })
  })
}