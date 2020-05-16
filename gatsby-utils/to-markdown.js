const remark = require("remark")
const remarkHTML = require("remark-html")

function toMarkdown(content) {
  return remark().use(remarkHTML).processSync(content).toString()
}

module.exports = toMarkdown
