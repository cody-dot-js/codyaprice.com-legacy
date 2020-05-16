export default function formatModifiedTime(
  modifiedTime: string | number | Date
) {
  const date = new Date(modifiedTime).toLocaleString()

  return `Updated: ${date}`
}
