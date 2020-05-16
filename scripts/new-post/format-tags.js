function formatTags(tags = []) {
  return tags.length > 0
    ? '\n' + tags.map((tag) => ` - ${tag}`).join('\n')
    : '';
}

module.exports = formatTags;
