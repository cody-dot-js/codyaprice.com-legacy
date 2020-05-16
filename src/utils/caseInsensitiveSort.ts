export default function caseInsensitiveSort(lhs = '', rhs = '') {
  const left = lhs.toLocaleLowerCase();
  const right = rhs.toLocaleLowerCase();

  if (left < right) {
    return -1;
  }

  if (left > right) {
    return 1;
  }

  return 0;
}
