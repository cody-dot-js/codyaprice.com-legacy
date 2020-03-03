import React from "react"
import useUniqueId from "./useUniqueId"
import useCounter from "./useCounter"

function trimSlashes(url = "") {
  return url.replace(/^\/|\/$/g, "")
}

function useLove(uri, ceiling = 50) {
  const readerId = useUniqueId("readerId")
  const { count: love, increment } = useCounter(
    `love/${trimSlashes(uri)}/${readerId}`
  )

  const hug = React.useCallback(() => {
    if (ceiling == null || ceiling < 0) {
      return
    }

    if (love < ceiling) {
      increment()
    }
  }, [ceiling, increment, love])

  return [love, hug]
}

export default useLove
