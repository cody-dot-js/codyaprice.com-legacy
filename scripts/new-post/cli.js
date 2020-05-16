const args = require("args")
const parseTags = require("./parse-tags")

function cli() {
  args
    .option("title", "The blog post title")
    .option("description", "The blog post's description")
    .option(
      "tags",
      "A comma separated list of tags to apply to the blog post",
      [],
      (content) =>
        content.reduce((acc, tags) => acc.concat(...parseTags(tags)), [])
    )

  return args.parse(process.argv)
}
module.exports = cli
