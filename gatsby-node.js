const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const BlogPost = path.resolve(`./src/templates/blog-post.js`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const { data, errors } = await graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            fields {
              slug
              modifiedTime
            }
            frontmatter {
              title
              date
              categories
              tags
            }
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  // Create blog posts pages.
  const { edges: posts } = data.allMdx

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: BlogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  })
}

function getSlugBase(dir) {
  return path.parse(path.dirname(dir)).base
}

function getSlugPath({ node, getNode, parentNode }) {
  // get the slug base path, e.g. 'blog'
  const slugBase = getSlugBase(parentNode.dir)

  // resources will begin with a number 'xxxx-', just for sorting order in their
  // respective dirs, strip it off
  const resourceName = createFilePath({ node, getNode })
    .split("-")
    .slice(1)
    .join("-")

  return `/${slugBase}/${resourceName}`
}

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions
  const { type } = node.internal

  if (type === "Mdx") {
    const parentNode = getNode(node.parent)
    const { modifiedTime } = parentNode

    const slug = getSlugPath({ node, getNode, parentNode })

    createNodeField({
      name: `slug`,
      node,
      value: slug
    })

    createNodeField({
      node,
      name: "modifiedTime",
      value: modifiedTime
    })
  }
}
