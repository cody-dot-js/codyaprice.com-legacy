export default function formatModifiedTime(modifiedTime) {
  const date = new Date(modifiedTime).toLocaleString();

  return `Updated: ${date}`;
}
