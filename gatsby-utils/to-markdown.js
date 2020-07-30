const remark = require('remark');
const remarkHTML = require('remark-html');

function toMarkdown(content) {
  return remark()
    .use(remarkHTML, { sanitize: true })
    .processSync(content)
    .toString();
}

module.exports = toMarkdown;
