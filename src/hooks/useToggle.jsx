import React from "react"

function useToggle(defaultState = false) {
  const [value, setToggle] = React.useState(defaultState)

  const toggle = React.useCallback(() => {
    setToggle((v) => !v)
  }, [])

  return [value, toggle]
}

export default useToggle
