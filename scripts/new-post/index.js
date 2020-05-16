const fs = require("fs")
const mustache = require("mustache")
const cli = require("./cli")
const formatTags = require("./format-tags")
const newPostPath = require("./new-post-path")
const promptForMissingInputs = require("./prompt-for-missing-inputs")

async function runner() {
  const inputs = cli()
  const { title, description, tags } = await promptForMissingInputs(inputs)

  const postPath = newPostPath(title)
  fs.mkdirSync(postPath)

  const now = new Date().toISOString()
  const view = {
    title,
    description,
    tags: formatTags(tags),
    date: now,
  }

  const templateData = fs.readFileSync(`${__dirname}/blog-template.md`, "utf8")
  const newPost = mustache.render(templateData, view)

  fs.writeFileSync(`${postPath}/index.md`, newPost, "utf8")
}

runner()
