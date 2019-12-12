const fs = require("fs")
const blogsPath = require("./blogs-path")

function newPostNumber() {
  const postNumbers = fs
    .readdirSync(blogsPath)
    .map(filename => parseInt(filename.split("-")[0], 10))
    .filter(Boolean)
    .sort((l, r) => l < r)
    .reverse()

  const postNumber = postNumbers[0] + 1

  return `${postNumber}`.padStart(4, "0")
}

module.exports = newPostNumber
