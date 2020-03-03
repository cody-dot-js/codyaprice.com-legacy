import React from "react"
import createPersistedState from "use-persisted-state"

function generateUniqueId() {
  return (
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36)
  )
}

function useUniqueId(key = "id") {
  const usePersistedId = createPersistedState(`cap:${key}`)
  const [id, setId] = usePersistedId(() => generateUniqueId())

  React.useEffect(() => {
    if (!id) {
      setId(generateUniqueId())
    }
  }, [id, setId])

  return id
}

export default useUniqueId
