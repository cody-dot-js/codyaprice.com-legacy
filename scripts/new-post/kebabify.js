function kebabify(str = "") {
  return str
    .toLowerCase()
    .replace(/[\W_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .join("-")
    .trim()
}

module.exports = kebabify
