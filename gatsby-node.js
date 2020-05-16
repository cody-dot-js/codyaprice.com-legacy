const path = require('path');
const kebabCase = require('lodash.kebabcase');
const BlogPost = path.resolve('./src/templates/blog-post.js');
const TagsList = path.resolve('./src/templates/tags-list.jsx');
const {
  caseInsensitiveSort,
  getSlugPath,
  toMarkdown,
} = require('./gatsby-utils');

async function createBlogPostPages({ actions, graphql }) {
  const { createPage } = actions;

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
  `);

  if (errors) {
    throw errors;
  }

  // Create blog posts pages.
  const { edges: posts } = data.allMdx;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: BlogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
}

async function createTagsListPages({ actions, graphql }) {
  const { createPage } = actions;

  const { data, errors } = await graphql(`
    query {
      allMdx {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  const tags = data.allMdx.group.reduce((acc, tag) => {
    const slug = kebabCase(tag.fieldValue.toLowerCase());

    acc.push({ name: tag.fieldValue, count: tag.totalCount, slug });

    return acc;
  }, []);

  tags.forEach(({ name, slug, count }) => {
    const path = `/blog/tags/${slug}`;
    createPage({
      path,
      component: TagsList,
      context: {
        tag: name,
        count,
        slug,
      },
    });
  });
}

exports.createPages = async ({ actions, graphql }) => {
  createBlogPostPages({ actions, graphql });
  createTagsListPages({ actions, graphql });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;
  const { type } = node.internal;

  if (type === 'Mdx') {
    const parentNode = getNode(node.parent);

    createNodeField({
      name: `slug`,
      node,
      value: getSlugPath({ node, getNode, parentNode }),
    });

    createNodeField({
      node,
      name: 'modifiedTime',
      value: parentNode.modifiedTime,
    });

    createNodeField({
      node,
      name: 'tags',
      // intentionally sort in place
      value: node.frontmatter.tags.sort(caseInsensitiveSort),
    });

    createNodeField({
      node,
      name: 'descriptionMd',
      value: toMarkdown(node.frontmatter.description),
    });

    createNodeField({
      name: 'hero',
      node,
      value: {
        ...node.frontmatter.hero,
        caption: toMarkdown(node.frontmatter.hero.caption),
      },
    });
  }
};
