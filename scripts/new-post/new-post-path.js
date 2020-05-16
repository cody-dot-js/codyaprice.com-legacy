const blogsPath = require('./blogs-path');
const newPostNumber = require('./new-post-number');
const kebabify = require('./kebabify');

function newPostPath(title = '') {
  const postNumber = newPostNumber();
  const kebabedTitle = kebabify(title);

  return `${blogsPath}/${postNumber}-${kebabedTitle}`;
}

module.exports = newPostPath;
