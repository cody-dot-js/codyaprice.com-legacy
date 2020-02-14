const cache = {}

function uniqueId(key = "") {
  const id = cache[key] || 0
  cache[key] = id + 1

  return `${key}${id}`
}

export default uniqueId
