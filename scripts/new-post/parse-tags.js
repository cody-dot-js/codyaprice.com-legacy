function parseTags(tags = []) {
  return tags
    .split(',')
    .filter(Boolean)
    .map((tag) => tag.replace(/\s+/g, ' ').trim());
}

module.exports = parseTags;
