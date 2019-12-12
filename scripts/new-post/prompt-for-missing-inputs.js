const prompt = require("async-prompt")
const parseTags = require("./parse-tags")

async function promptForMissingInputs(inputs = {}) {
  const title = inputs.title || (await prompt("title: "))
  const description = inputs.description || (await prompt("description: "))
  const tags =
    inputs.tags && inputs.tags.length > 0
      ? inputs.tags
      : parseTags(await prompt("tags: "))

  return {
    title,
    description,
    tags
  }
}

module.exports = promptForMissingInputs
