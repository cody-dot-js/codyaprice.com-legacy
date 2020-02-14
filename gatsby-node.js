const path = require(`path`)
const BlogPost = path.resolve(`./src/templates/blog-post.js`)
const {
  caseInsensitiveSort,
  getSlugPath,
  toMarkdown
} = require("./gatsby-utils")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const { data, errors } = await graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            fields {
              descriptionMd
              slug
              modifiedTime
              tags
            }
            frontmatter {
              title
              description
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

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions
  const { type } = node.internal

  if (type === "Mdx") {
    const parentNode = getNode(node.parent)

    createNodeField({
      name: `slug`,
      node,
      value: getSlugPath({ node, getNode, parentNode })
    })

    createNodeField({
      node,
      name: "modifiedTime",
      value: parentNode.modifiedTime
    })

    createNodeField({
      node,
      name: "tags",
      // intentionally sort in place
      value: node.frontmatter.tags.sort(caseInsensitiveSort)
    })

    createNodeField({
      node,
      name: "descriptionMd",
      value: toMarkdown(node.frontmatter.description)
    })

    createNodeField({
      name: "hero",
      node,
      value: {
        ...node.frontmatter.hero,
        caption: toMarkdown(node.frontmatter.hero.caption)
      }
    })
  }
}
