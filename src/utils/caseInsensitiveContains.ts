export default function caseInsensitiveContains(
  string?: string,
  query?: string
) {
  if (!string) {
    return false;
  }

  const searchable = `${string}`.toLowerCase();
  const by = `${query}`.trim().toLowerCase();

  return searchable.includes(by);
}
