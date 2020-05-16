const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

function getSlugBase(dir) {
  return path.parse(path.dirname(dir)).base;
}

function getSlugPath({ node, getNode, parentNode }) {
  // get the slug base path, e.g. 'blog'
  const slugBase = getSlugBase(parentNode.dir);

  // resources will begin with a number 'xxxx-', just for sorting order in their
  // respective dirs, strip it off
  const resourceName = createFilePath({ node, getNode })
    .split('-')
    .slice(1)
    .join('-');

  return `/${slugBase}/${resourceName}`;
}

module.exports = getSlugPath;
