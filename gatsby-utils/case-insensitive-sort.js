function caseInsensitiveSort(lhs = '', rhs = '') {
  const left = lhs.toLowerCase();
  const right = rhs.toLowerCase();

  if (left < right) {
    return -1;
  }

  if (left > right) {
    return 1;
  }

  return 0;
}

module.exports = caseInsensitiveSort;
